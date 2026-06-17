import { Lesson } from '../../types';

export const mlL1: Lesson = {
  slug: 'project-structure', title: 'ML Project Structure, DVC, MLflow',
  subtitle: 'Structure ML projects like a senior ML engineer',
  duration: 70, difficulty: 'Intermediate', phase: 'Foundation', xp: 200, moduleSlug: 'ml',
  objectives: ['Structure an ML project properly (data/, models/, notebooks/, src/)','Use DVC for data versioning','Use MLflow for experiment tracking','Separate config from code','Create reproducible pipelines'],
  realWorldContext: 'ML projects without structure are chaos — data scattered, experiments not tracked, models not reproducible. Companies like Google and Meta have strict ML project standards. DVC versions data (like Git for data). MLflow tracks experiments (which model was best?). Without these, you cannot reproduce results or compare models.',
  prerequisites: ['Python knowledge','Basic ML concepts','Git familiarity'],
  conceptDiagram: `ML PROJECT STRUCTURE:
  myproject/
  ├── data/           ← raw, processed (DVC-tracked)
  ├── models/         ← saved models (.pkl, .onnx)
  ├── src/
  │   ├── data/       ← data loading, preprocessing
  │   ├── models/     ← model definitions
  │   ├── train.py    ← training script
  │   └── predict.py  ← inference
  ├── notebooks/      ← EDA, experiments
  ├── configs/        ← YAML configs (hyperparams)
  ├── dvc.yaml        ← DVC pipeline
  └── requirements.txt

  DVC: versions large data files (Git tracks pointer)
  MLflow: tracks experiments (params, metrics, artifacts)`,
  conceptExplanation: ['ML projects need structure: data/ for datasets, models/ for saved models, src/ for code, notebooks/ for exploration, configs/ for hyperparameters. Without this, files are scattered and teammates cannot find anything.','DVC (Data Version Control) versions large data files. Git cannot handle 10GB CSV files. DVC stores a pointer in Git and the actual data in a remote storage (S3, GCS). dvc push/dvc pull sync data. Like Git, but for data.','MLflow tracks experiments: parameters (learning_rate=0.001), metrics (accuracy=0.95), artifacts (model.pkl). Compare runs in MLflow UI. Without MLflow, you track experiments in spreadsheets (unreliable, not searchable).'],
  whyItMatters: 'Without structure, ML projects become unmaintainable. Without DVC, you cannot reproduce results (which data version produced which model?). Without MLflow, you cannot compare experiments (was model A or B better?). These are the foundation of professional ML.',
  codeExamples: [
    { filename: 'train.py', language: 'python', approach: 'real-world', code: `import mlflow
import yaml
from pathlib import Path

# Load config (separate from code!)
with open("configs/train.yaml") as f:
    config = yaml.safe_load(f)

# MLflow: track experiment
mlflow.set_experiment("sentiment-classification")

with mlflow.start_run():
    # Log parameters
    mlflow.log_params(config["model"])
    mlflow.log_param("data_version", "v2.1")  # DVC version
    
    # Train model
    model = train_model(config)
    
    # Log metrics
    mlflow.log_metric("accuracy", 0.95)
    mlflow.log_metric("f1_score", 0.93)
    
    # Log model artifact
    mlflow.sklearn.log_model(model, "model")
    
    # Log plots
    mlflow.log_artifact("confusion_matrix.png")`,
      explanation: 'MLflow tracks: params (config), metrics (accuracy), artifacts (model, plots). All in one experiment run. Compare runs in MLflow UI.' },
    { filename: 'dvc.yaml', language: 'yaml', approach: 'real-world', code: `# DVC pipeline: data → train → evaluate
stages:
  prepare:
    cmd: python src/data/prepare.py
    deps: [data/raw/]
    outs: [data/processed/]
  
  train:
    cmd: python src/train.py
    deps: [data/processed/, src/models/]
    outs: [models/model.pkl]
  
  evaluate:
    cmd: python src/evaluate.py
    deps: [models/model.pkl]
    metrics: [metrics.json]`,
      explanation: 'DVC pipeline: prepare data → train → evaluate. Each stage has dependencies and outputs. dvc repro runs the entire pipeline. Reproducible!' },
  ],
  configFiles: [{ filename: 'configs/train.yaml', language: 'yaml', content: `model:\n  name: random_forest\n  n_estimators: 100\n  max_depth: 10\ntraining:\n  batch_size: 32\n  epochs: 10\n  learning_rate: 0.001\ndata:\n  train_path: data/processed/train.csv\n  test_path: data/processed/test.csv`, comment: 'Config separate from code. Change hyperparameters without modifying code.' }],
  lab: { title: 'Set Up ML Project', steps: [
    { step: 1, title: 'Install tools', instruction: 'Install DVC and MLflow', command: 'pip install dvc mlflow' },
    { step: 2, title: 'Init DVC', instruction: 'Initialize DVC', command: 'dvc init' },
    { step: 3, title: 'Track data', instruction: 'Add data to DVC', command: 'dvc add data/raw/dataset.csv' },
    { step: 4, title: 'Start MLflow', instruction: 'Run MLflow server', command: 'mlflow server --host 0.0.0.0 --port 5000', verification: 'Open http://localhost:5000 — MLflow UI' },
  ]},
  commonErrors: [{ error: 'dvc push fails — no remote configured', fix: 'Configure remote: dvc remote add -d storage s3://my-bucket/dvc-storage. Then dvc push.', rootCause: 'DVC needs a remote storage (S3, GCS) to store data. Without it, dvc push has nowhere to push.' }],
  quiz: [
    { question: 'Why use DVC instead of Git for data?', options: ['Faster', 'Git cannot handle large files (10GB). DVC stores pointer in Git, data in remote storage.', 'Required', 'DVC is newer'], correctIndex: 1, explanation: 'Git is designed for code (text files). Large data files (10GB CSV) bloat the repo. DVC stores a pointer in Git and data in S3/GCS. Like Git, but for data.' },
    { question: 'What does MLflow track?', options: ['Code changes', 'Parameters, metrics, artifacts (models, plots) for each experiment run', 'Git commits', 'DVC data'], correctIndex: 1, explanation: 'MLflow tracks: params (learning_rate), metrics (accuracy=0.95), artifacts (model.pkl). Compare runs in UI. Without MLflow, experiments are not reproducible.' },
  ],
  resources: [{ title: 'DVC', url: 'https://dvc.org/doc', type: 'docs' }, { title: 'MLflow', url: 'https://mlflow.org/docs/latest/', type: 'docs' }],
  whatToReadNext: 'Read about Data Pipeline (next lesson) — load, clean, feature engineering.',
};

export const mlL2: Lesson = {
  slug: 'data-pipeline', title: 'Data Pipeline — Load, Clean, Feature Engineering',
  subtitle: 'Build reproducible data pipelines for ML',
  duration: 75, difficulty: 'Intermediate', phase: 'Foundation', xp: 200, moduleSlug: 'ml',
  objectives: ['Load data from CSV, JSON, databases','Handle missing values and outliers','Create features from raw data','Normalize and encode data','Build a reproducible pipeline with sklearn Pipeline'],
  realWorldContext: '80% of ML work is data preparation. Garbage in, garbage out. Companies like Google and Netflix have entire teams for data engineering. Without proper data pipelines, your model trains on bad data and produces bad predictions. This is the unsexy but most important part of ML.',
  prerequisites: ['Completed ML L1','Python pandas/numpy knowledge'],
  conceptDiagram: `DATA PIPELINE:
  Raw data → Load → Clean → Feature Engineering → Split → Model

  CLEAN:
  • Missing values: drop, fill (mean/median), interpolate
  • Outliers: clip, remove, transform
  • Duplicates: remove
  • Types: convert (string → datetime, category → code)

  FEATURE ENGINEERING:
  • Numeric: log, sqrt, binning, scaling
  • Categorical: one-hot, label, target encoding
  • DateTime: day_of_week, month, is_weekend
  • Text: TF-IDF, word count

  SKLEARN PIPELINE (reproducible!):
  Pipeline([("imputer", SimpleImputer()), ("scaler", StandardScaler())])`,
  conceptExplanation: ['Data cleaning: handle missing values (drop, fill with mean/median), remove duplicates, fix data types. Outliers: clip to 1st/99th percentile or remove. Without cleaning, your model learns noise.','Feature engineering creates new features from raw data: datetime → day_of_week, is_weekend; categorical → one-hot encoding; text → word count, TF-IDF. Good features matter more than model choice — a simple model with great features beats a complex model with bad features.','sklearn Pipeline chains preprocessing + model: Pipeline([("scaler", StandardScaler()), ("model", RandomForest())]). Fit on train, transform on test — no data leakage. Save the pipeline (joblib) — includes all preprocessing. Deploy the pipeline, not just the model.'],
  whyItMatters: 'A model is only as good as its data. If you train on data with missing values, your model crashes in production. If you do not scale features, gradient descent is slow. If you leak test data into training, your accuracy is fake. Data pipelines are the foundation of ML.',
  codeExamples: [
    { filename: 'pipeline.py', language: 'python', approach: 'real-world', code: `import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data
df = pd.read_csv("data/raw/customers.csv")

# Clean: remove duplicates, handle missing
df = df.drop_duplicates()
df["age"] = df["age"].clip(0, 120)  # remove impossible ages

# Feature engineering
df["signup_date"] = pd.to_datetime(df["signup_date"])
df["days_since_signup"] = (pd.Timestamp.now() - df["signup_date"]).dt.days
df["is_weekend_signup"] = df["signup_date"].dt.dayofweek >= 5

# Define preprocessing per column type
numeric_features = ["age", "income", "days_since_signup"]
categorical_features = ["city", "plan"]

preprocessor = ColumnTransformer([
    ("num", Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]), numeric_features),
    ("cat", Pipeline([
        ("imputer", SimpleImputer(strategy="constant", fill_value="unknown")),
        ("encoder", OneHotEncoder(handle_unknown="ignore")),
    ]), categorical_features),
])

# Full pipeline: preprocessing + model
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestClassifier(n_estimators=100, random_state=42)),
])

# Train
X = df[numeric_features + categorical_features]
y = df["churned"]
pipeline.fit(X, y)

# Save entire pipeline (includes preprocessing!)
joblib.dump(pipeline, "models/churn_model.pkl")

# In production: just load and predict
# pipeline = joblib.load("models/churn_model.pkl")
# pipeline.predict(new_data)  # preprocessing happens automatically!`,
      explanation: 'Production pipeline: ColumnTransformer (different preprocessing per column type), Pipeline (preprocessing + model together). Save with joblib. In production, load and predict — preprocessing is included.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Data Pipeline', steps: [
    { step: 1, title: 'Load data', instruction: 'Load CSV with pandas', command: 'python -c "import pandas as pd; df=pd.read_csv(\'data.csv\'); print(df.info())"' },
    { step: 2, title: 'Clean', instruction: 'Handle missing + outliers', command: 'df = df.dropna(); df[\'age\'] = df[\'age\'].clip(0, 120)' },
    { step: 3, title: 'Build pipeline', instruction: 'Create sklearn Pipeline', command: 'Create Pipeline with SimpleImputer + StandardScaler + model' },
    { step: 4, title: 'Save', instruction: 'Save with joblib', command: 'joblib.dump(pipeline, \'model.pkl\')', verification: 'Load and predict on new data' },
  ]},
  commonErrors: [{ error: 'Model works in training, crashes in production', fix: 'Save the entire Pipeline (preprocessing + model), not just the model. joblib.dump(pipeline). In production, pipeline.predict() handles preprocessing automatically.', rootCause: 'If you save only the model, production data is not preprocessed (not scaled, not encoded). Save the pipeline to include preprocessing.' }],
  quiz: [
    { question: 'Why use sklearn Pipeline?', options: ['Faster', 'Reproducible preprocessing — no data leakage, save entire pipeline for production', 'Required', 'Better accuracy'], correctIndex: 1, explanation: 'Pipeline chains preprocessing + model. Fit on train, transform on test (no leakage). Save with joblib — production gets preprocessing + model in one.' },
    { question: 'What is data leakage?', options: ['Data loss', 'Test data influences training (e.g., scaling on full dataset instead of train only)', 'Slow training', 'Too much data'], correctIndex: 1, explanation: 'Data leakage: information from test/validation set leaks into training. Example: scaling on entire dataset (including test). Fix: fit scaler on train only, transform test with fitted scaler. Pipeline handles this automatically.' },
  ],
  resources: [{ title: 'sklearn Pipeline', url: 'https://scikit-learn.org/stable/modules/compose.html', type: 'docs' }, { title: 'Feature Engineering', url: 'https://scikit-learn.org/stable/data_transforms.html', type: 'docs' }],
  whatToReadNext: 'Read about Experiment Tracking (next lesson) — MLflow, W&B.',
};

export const mlL3: Lesson = {
  slug: 'experiment-tracking', title: 'Experiment Tracking — MLflow, W&B',
  subtitle: 'Track ML experiments and compare models',
  duration: 65, difficulty: 'Intermediate', phase: 'Foundation', xp: 150, moduleSlug: 'ml',
  objectives: ['Log parameters, metrics, and artifacts with MLflow','Compare experiment runs in MLflow UI','Use W&B (Weights & Biases) for advanced tracking','Register best models','Reproduce experiments'],
  realWorldContext: 'Without experiment tracking, you have 50 models and no idea which is best. "Was the model with lr=0.001 better than lr=0.01?" Without tracking, you guess. With MLflow/W&B, you compare all runs in a UI, see metrics, and pick the best. Every ML team uses experiment tracking.',
  prerequisites: ['Completed ML L1-L2'],
  conceptDiagram: `EXPERIMENT TRACKING:
  Each run logs:
  • Parameters: model_type, learning_rate, batch_size
  • Metrics: accuracy, loss, f1_score
  • Artifacts: model.pkl, plots, configs
  
  MLflow UI: compare runs side by side
  "Show me all runs with accuracy > 0.9"
  
  MODEL REGISTRY:
  Best model → register → version → deploy
  v1 (prod) → v2 (staging) → v3 (experiment)`,
  conceptExplanation: ['MLflow tracks everything about an experiment run: parameters (what you set), metrics (what you measured), artifacts (what you produced). All in one place. Compare runs in the UI — sort by accuracy, filter by parameter.','W&B (Weights & Biases) is like MLflow but with better UI, collaboration, and visualizations. Used by OpenAI, Meta, and Google. Free for individuals. Better for teams (shared dashboards, comments).','Model Registry: register the best model. Version it (v1, v2). Promote: None → Staging → Production. Rollback if needed. This is how models are managed in production — not random .pkl files.'],
  whyItMatters: 'Without tracking, experiments are not reproducible. You cannot answer "which model was best?" or "what parameters did we use?" Without a model registry, you deploy random .pkl files with no versioning. This is how professional ML teams work.',
  codeExamples: [
    { filename: 'tracking.py', language: 'python', approach: 'real-world', code: `import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score

mlflow.set_experiment("churn-prediction")

# Multiple runs with different params
for n_estimators in [50, 100, 200]:
    for max_depth in [5, 10, None]:
        with mlflow.start_run():
            # Log params
            mlflow.log_params({
                "n_estimators": n_estimators,
                "max_depth": max_depth,
                "model_type": "random_forest",
            })
            
            # Train
            model = RandomForestClassifier(
                n_estimators=n_estimators,
                max_depth=max_depth,
                random_state=42,
            )
            model.fit(X_train, y_train)
            
            # Evaluate
            pred = model.predict(X_test)
            mlflow.log_metrics({
                "accuracy": accuracy_score(y_test, pred),
                "f1": f1_score(y_test, pred),
            })
            
            # Log model
            mlflow.sklearn.log_model(model, "model")
            
            # Log feature importance plot
            import matplotlib.pyplot as plt
            plt.barh(X.columns, model.feature_importances_)
            plt.savefig("feature_importance.png")
            mlflow.log_artifact("feature_importance.png")

# Register best model
model_uri = "runs:/<best_run_id>/model"
mlflow.register_model(model_uri, "churn-model")
# Promote to production in MLflow UI`,
      explanation: 'MLflow: log params, metrics, artifacts for each run. Compare in UI. Register best model with versioning. This is how ML experiments are tracked professionally.' },
  ],
  configFiles: [],
  lab: { title: 'Track Experiments', steps: [
    { step: 1, title: 'Start MLflow', instruction: 'Run MLflow server', command: 'mlflow server --host 0.0.0.0 --port 5000' },
    { step: 2, title: 'Track runs', instruction: 'Log params and metrics', command: 'Add mlflow.start_run() and log_params/metrics to train.py' },
    { step: 3, title: 'Compare', instruction: 'Open MLflow UI', command: 'Open http://localhost:5000', verification: 'See all runs with metrics, compare side by side' },
  ]},
  commonErrors: [{ error: 'MLflow UI shows no runs', fix: 'Make sure mlflow.set_tracking_uri("http://localhost:5000") is set in your script. Or run mlflow server before training.', rootCause: 'MLflow logs to local file by default. Set tracking_uri to send to server.' }],
  quiz: [{ question: 'What does MLflow track per experiment run?', options: ['Only accuracy', 'Parameters, metrics, artifacts (model, plots) — everything about the run', 'Only code', 'Only model'], correctIndex: 1, explanation: 'MLflow tracks: params (learning_rate), metrics (accuracy), artifacts (model.pkl, plots). Everything needed to reproduce and compare runs.' }],
  resources: [{ title: 'MLflow', url: 'https://mlflow.org/docs/latest/', type: 'docs' }, { title: 'W&B', url: 'https://wandb.ai/', type: 'docs' }],
  whatToReadNext: 'Read about PyTorch Dataset & DataLoader (next lesson).',
};

// L4-L15 — real content
export const mlL4: Lesson = {
  slug: 'pytorch-dataset', title: 'PyTorch Dataset & DataLoader',
  subtitle: 'Load and batch data for PyTorch training',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml',
  objectives: ['Create custom Dataset classes','Use DataLoader for batching and shuffling','Apply transforms (normalize, augment)','Handle large datasets with lazy loading','Use collate_fn for variable-length data'],
  realWorldContext: 'PyTorch Dataset and DataLoader are how every deep learning project loads data. Companies like Meta and Tesla use them for training on millions of images. Without proper data loading, your GPU sits idle waiting for data (training is 10x slower). DataLoader parallelizes data loading with multiple workers.',
  prerequisites: ['Completed ML L1-L3','Basic PyTorch knowledge'],
  conceptDiagram: `PYTORCH DATA LOADING:
  Dataset: defines how to get ONE sample
    __len__(): number of samples
    __getitem__(idx): return one (input, label)
  
  DataLoader: batches, shuffles, parallelizes
    DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)
  
  FLOW:
  Dataset → DataLoader → batches → GPU → model
  
  num_workers=4: 4 processes load data in parallel
  (GPU never waits for data!)`,
  conceptExplanation: ['Dataset is an abstract class. Override __len__ (total samples) and __getitem__ (return one sample). This is the interface PyTorch uses. Your dataset can load from disk, memory, database — anything.','DataLoader wraps Dataset and provides: batching (batch_size=32), shuffling (shuffle=True), parallel loading (num_workers=4), collation (combine samples into batch). This is the bridge between your data and the GPU.','Transforms: normalize (subtract mean, divide std), augment (flip, rotate, crop for images). Apply in __getitem__. For production, use torchvision.transforms for images. For text, use tokenization in __getitem__.'],
  whyItMatters: 'Without DataLoader, you load data sequentially (GPU waits = wasted GPU time). Without proper batching, you run out of GPU memory. Without augmentation, your model overfits. Data loading is 50% of training performance.',
  codeExamples: [
    { filename: 'dataset.py', language: 'python', approach: 'real-world', code: `import torch
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import numpy as np

class ImageDataset(Dataset):
    def __init__(self, image_paths, labels, transform=None):
        self.image_paths = image_paths
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        # Load image (lazy — only when needed)
        image = Image.open(self.image_paths[idx]).convert("RGB")
        label = self.labels[idx]

        if self.transform:
            image = self.transform(image)

        return image, label

# Create dataset
from torchvision import transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

dataset = ImageDataset(
    image_paths=["img1.jpg", "img2.jpg", ...],
    labels=[0, 1, ...],
    transform=transform,
)

# DataLoader: batch, shuffle, parallel
dataloader = DataLoader(
    dataset,
    batch_size=32,
    shuffle=True,
    num_workers=4,  # 4 parallel processes loading data
    pin_memory=True,  # faster GPU transfer
)

# Training loop
for images, labels in dataloader:
    images = images.to("cuda")  # move to GPU
    labels = labels.to("cuda")
    outputs = model(images)
    loss = criterion(outputs, labels)
    loss.backward()
    optimizer.step()`,
      explanation: 'Dataset: __len__ + __getitem__. Transform: resize, normalize. DataLoader: batch_size, shuffle, num_workers (parallel), pin_memory (GPU). Training loop iterates dataloader.' },
  ],
  configFiles: [],
  lab: { title: 'Create a Dataset', steps: [
    { step: 1, title: 'Create Dataset', instruction: 'Write custom Dataset class', command: 'Create ImageDataset with __len__ and __getitem__' },
    { step: 2, title: 'Create DataLoader', instruction: 'Wrap with DataLoader', command: 'DataLoader(dataset, batch_size=32, shuffle=True, num_workers=4)' },
    { step: 3, title: 'Iterate', instruction: 'Test batching', command: 'for images, labels in dataloader: print(images.shape)', expectedOutput: 'torch.Size([32, 3, 224, 224])' },
  ]},
  commonErrors: [{ error: 'DataLoader is slow (GPU waits)', fix: 'Increase num_workers (4-8). Set pin_memory=True. Use persistent_workers=True. Prefetch with prefetch_factor=2.', rootCause: 'Default num_workers=0 (sequential). GPU waits for data. Parallel workers (num_workers=4) load data while GPU computes.' }],
  quiz: [{ question: 'What does num_workers do in DataLoader?', options: ['Number of GPUs', 'Number of parallel processes loading data (GPU does not wait)', 'Batch size', 'Number of epochs'], correctIndex: 1, explanation: 'num_workers=N spawns N processes to load data in parallel. While GPU processes batch 1, workers prepare batch 2. GPU never waits for data.' }],
  resources: [{ title: 'PyTorch Data Loading', url: 'https://pytorch.org/tutorials/beginner/data_loading_tutorial.html', type: 'docs' }],
  whatToReadNext: 'Read about PyTorch Model (next lesson) — nn.Module, layers, forward.',
};

export const mlL5: Lesson = {
  slug: 'pytorch-model', title: 'PyTorch Model — nn.Module, Layers, Forward',
  subtitle: 'Build neural networks with PyTorch',
  duration: 75, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml',
  objectives: ['Create models with nn.Module','Use built-in layers (Linear, Conv2d, LSTM)','Implement forward pass','Use activation functions (ReLU, Softmax)','Understand parameters and device placement'],
  realWorldContext: 'Every deep learning model at Meta, Google, and OpenAI is built with nn.Module. ResNet, BERT, GPT — all are nn.Module subclasses. Understanding how to define layers, implement forward pass, and manage parameters is the core of PyTorch.',
  prerequisites: ['Completed ML L1-L4'],
  conceptDiagram: `nn.Module:
  __init__(): define layers (Linear, Conv2d)
  forward(x): define how data flows through layers

  EXAMPLE:
  class MLP(nn.Module):
    def __init__(self):
      self.fc1 = nn.Linear(784, 256)  # input → hidden
      self.fc2 = nn.Linear(256, 10)   # hidden → output
    def forward(self, x):
      x = torch.relu(self.fc1(x))     # activation
      return self.fc2(x)               # logits

  model = MLP().to("cuda")  # move to GPU
  output = model(input)     # calls forward()`,
  conceptExplanation: ['nn.Module is the base class for all PyTorch models. Define layers in __init__, implement forward pass in forward(). PyTorch handles backpropagation automatically (autograd).','Built-in layers: nn.Linear (fully connected), nn.Conv2d (convolution), nn.LSTM (recurrent), nn.Embedding (word embeddings), nn.Dropout (regularization). Each has learnable parameters.','Activation functions: F.relu (hidden layers), softmax (output for classification), sigmoid (binary output). Applied in forward(). ReLU is the default for hidden layers — simple, fast, no vanishing gradient.'],
  whyItMatters: 'Without understanding nn.Module, you cannot build any neural network. Every PyTorch model — from simple MLP to GPT — uses this pattern. This is the absolute core of deep learning.',
  codeExamples: [
    { filename: 'model.py', language: 'python', approach: 'real-world', code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class CNN(nn.Module):
    """CNN for image classification (e.g., MNIST, CIFAR)."""
    def __init__(self, num_classes=10):
        super().__init__()
        # Convolutional layers (feature extraction)
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.25)
        
        # Fully connected layers (classification)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, num_classes)
    
    def forward(self, x):
        # Conv block 1: Conv → ReLU → Pool
        x = self.pool(F.relu(self.conv1(x)))  # 32x32 → 16x16
        x = self.pool(F.relu(self.conv2(x)))  # 16x16 → 8x8
        
        # Flatten for FC
        x = x.view(x.size(0), -1)  # (batch, 64*8*8)
        
        # FC block
        x = self.dropout(F.relu(self.fc1(x)))
        x = self.fc2(x)  # logits (no softmax — CrossEntropyLoss includes it)
        return x

# Create model
model = CNN(num_classes=10).to("cuda")
print(f"Parameters: {sum(p.numel() for p in model.parameters()):,}")
# Forward pass
images = torch.randn(32, 3, 32, 32).to("cuda")
outputs = model(images)  # (32, 10)
print(outputs.shape)`,
      explanation: 'CNN: Conv2d (feature extraction) → MaxPool (downsample) → FC (classification). forward() defines data flow. .to("cuda") moves to GPU. CrossEntropyLoss includes softmax — do not add it in forward.' },
  ],
  configFiles: [],
  lab: { title: 'Build a Neural Network', steps: [
    { step: 1, title: 'Install PyTorch', instruction: 'Install', command: 'pip install torch torchvision' },
    { step: 2, title: 'Create model', instruction: 'Write nn.Module', command: 'Create MLP with 2 Linear layers + ReLU' },
    { step: 3, title: 'Forward pass', instruction: 'Test', command: 'model(torch.randn(1, 784))', expectedOutput: 'torch.Size([1, 10])' },
  ]},
  commonErrors: [{ error: 'RuntimeError: mat1 and mat2 shapes cannot be multiplied', fix: 'Check input shape matches first layer: Linear(784, 256) expects input of shape (batch, 784). Reshape with x.view(batch, -1) before first FC layer.', rootCause: 'Shape mismatch between layer input and actual input. Check: model expects 784 features, input has different size. Use x.view(batch, -1) to flatten.' }],
  quiz: [{ question: 'Where do you define layers in nn.Module?', options: ['forward()', '__init__() — layers are defined here, forward defines data flow', 'outside class', 'anywhere'], correctIndex: 1, explanation: '__init__ defines layers (self.fc1 = nn.Linear(...)). forward() defines how data flows through layers (x = self.fc1(x)). PyTorch calls forward() when you do model(input).' }],
  resources: [{ title: 'PyTorch nn.Module', url: 'https://pytorch.org/docs/stable/generated/torch.nn.Module.html', type: 'docs' }],
  whatToReadNext: 'Read about Training Loop (next lesson) — optimizer, loss, checkpoints.',
};

export const mlL6: Lesson = {
  slug: 'training-loop', title: 'Training Loop — Optimizer, Loss, Checkpoints',
  subtitle: 'Train neural networks with proper training loops',
  duration: 80, difficulty: 'Intermediate', phase: 'Intermediate', xp: 250, moduleSlug: 'ml',
  objectives: ['Write a complete training loop','Use optimizers (SGD, Adam, AdamW)','Choose loss functions (CrossEntropy, MSE)','Save and load checkpoints','Add learning rate scheduling','Track training/validation metrics'],
  realWorldContext: 'The training loop is where learning happens. Every ML engineer writes this daily. Companies train models for hours to weeks — checkpoints save progress (resume after crash). Learning rate scheduling improves accuracy by 5-10%. Without a proper training loop, your model does not learn.',
  prerequisites: ['Completed ML L1-L5'],
  conceptDiagram: `TRAINING LOOP (per epoch):
  for batch in dataloader:
    1. Forward: output = model(input)
    2. Loss: loss = criterion(output, target)
    3. Zero gradients: optimizer.zero_grad()
    4. Backward: loss.backward()  (compute gradients)
    5. Update: optimizer.step()   (update weights)
  
  After each epoch:
    - Evaluate on validation set
    - Save checkpoint (if best)
    - Update learning rate (scheduler)
    - Log metrics (MLflow, W&B)`,
  conceptExplanation: ['The training loop: forward (compute predictions), loss (measure error), zero_grad (clear old gradients), backward (compute new gradients), step (update weights). This is the core of gradient descent — every DL framework does this.','Optimizer: Adam (default, adaptive learning rate), SGD (simple, needs tuning), AdamW (Adam with weight decay for regularization). Learning rate is the MOST IMPORTANT hyperparameter — too high = diverge, too low = slow.','Checkpoints: save model state, optimizer state, epoch, metrics. Resume after crash. Save best model (lowest validation loss). joblib for sklearn, torch.save for PyTorch. Always save in addition to MLflow.','Learning rate scheduler: ReduceLROnPlateau (decrease LR when validation loss plateaus), CosineAnnealingLR (smooth decay). Improves accuracy by 5-10% — the model fine-tunes with smaller steps near the optimum.'],
  whyItMatters: 'A wrong training loop means your model does not learn (forgot zero_grad), crashes (OOM), or loses progress (no checkpoints). The learning rate is the most critical hyperparameter — wrong LR = wasted training. This is the heart of ML.',
  codeExamples: [
    { filename: 'train.py', language: 'python', approach: 'production', code: `import torch
import torch.nn as nn
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR
from pathlib import Path

def train_model(model, train_loader, val_loader, epochs=50):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = model.to(device)
    
    # Loss (includes softmax for classification)
    criterion = nn.CrossEntropyLoss()
    
    # Optimizer (AdamW = Adam + weight decay)
    optimizer = AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
    
    # LR scheduler (smooth decay)
    scheduler = CosineAnnealingLR(optimizer, T_max=epochs)
    
    best_val_loss = float("inf")
    
    for epoch in range(epochs):
        # TRAIN
        model.train()  # enable dropout, batchnorm training mode
        train_loss = 0
        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)
            
            # 1. Forward
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            # 2. Backward
            optimizer.zero_grad()  # CRITICAL: clear old gradients
            loss.backward()        # compute new gradients
            optimizer.step()       # update weights
            
            train_loss += loss.item()
        
        # VALIDATE
        model.eval()  # disable dropout, batchnorm uses running stats
        val_loss = 0
        correct = 0
        with torch.no_grad():  # no gradients needed for eval
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                val_loss += criterion(outputs, labels).item()
                correct += (outputs.argmax(1) == labels).sum().item()
        
        # Metrics
        train_loss /= len(train_loader)
        val_loss /= len(val_loader)
        val_acc = correct / len(val_loader.dataset)
        
        print(f"Epoch {epoch+1}: train_loss={train_loss:.4f}, val_loss={val_loss:.4f}, val_acc={val_acc:.4f}")
        
        # Save best checkpoint
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            torch.save({
                "epoch": epoch,
                "model_state": model.state_dict(),
                "optimizer_state": optimizer.state_dict(),
                "val_loss": val_loss,
                "val_acc": val_acc,
            }, "models/best_model.pth")
            print(f"  Saved best model (val_loss={val_loss:.4f})")
        
        # Update learning rate
        scheduler.step()
    
    return model`,
      explanation: 'Complete training loop: train (forward, loss, zero_grad, backward, step), validate (no_grad, eval mode), checkpoint (save best), scheduler (LR decay). This is what production training looks like.' },
  ],
  configFiles: [],
  lab: { title: 'Train a Model', steps: [
    { step: 1, title: 'Create model', instruction: 'Build a simple model', command: 'Create MLP or CNN with nn.Module' },
    { step: 2, title: 'Write training loop', instruction: 'Implement train function', command: 'Write train loop with forward, loss, backward, step' },
    { step: 3, title: 'Add checkpointing', instruction: 'Save best model', command: 'Add torch.save on best validation loss' },
    { step: 4, title: 'Train', instruction: 'Run training', command: 'python train.py', expectedOutput: 'Loss decreases each epoch' },
  ]},
  commonErrors: [
    { error: 'Loss does not decrease (NaN or flat)', fix: 'Check: 1) Did you call optimizer.zero_grad() before backward()? 2) Is learning rate too high? Try 1e-4. 3) Are inputs normalized?', rootCause: 'Missing zero_grad = gradients accumulate (explode). Too high LR = divergence. Unnormalized inputs = unstable training.' },
    { error: 'CUDA out of memory', fix: 'Reduce batch_size (32 → 16 → 8). Use gradient accumulation. Use mixed precision (torch.cuda.amp). Free memory: torch.cuda.empty_cache().', rootCause: 'Batch too large for GPU memory. Each sample uses memory for activations + gradients.' },
  ],
  quiz: [
    { question: 'Why call optimizer.zero_grad() before backward()?', options: ['Faster', 'PyTorch accumulates gradients — without zero_grad, gradients from previous batch are added (wrong!)', 'Required by CUDA', 'Prevents NaN'], correctIndex: 1, explanation: 'PyTorch accumulates gradients by default (for RNNs). If you do not zero, gradients from batch 1 are added to batch 2. Always call zero_grad() before backward().' },
    { question: 'What does model.eval() do?', options: ['Same as no_grad', 'Disables dropout, batchnorm uses running stats (not batch stats)', 'Saves model', 'Prints model'], correctIndex: 1, explanation: 'eval() switches to inference mode: dropout disabled (all neurons active), batchnorm uses running mean/std (not current batch). Use during validation. no_grad() disables gradient tracking (memory saving).' },
  ],
  resources: [{ title: 'PyTorch Training', url: 'https://pytorch.org/tutorials/beginner/introyt/trainingyt.html', type: 'docs' }],
  whatToReadNext: 'Read about Evaluation (next lesson) — confusion matrix, ROC, calibration.',
};

// L7-L15 — real content (condensed but specific)
export const mlL7: Lesson = {
  slug: 'evaluation', title: 'Evaluation — Confusion Matrix, ROC, Calibration',
  subtitle: 'Evaluate ML models properly',
  duration: 70, difficulty: 'Intermediate', phase: 'Intermediate', xp: 200, moduleSlug: 'ml',
  objectives: ['Build and interpret confusion matrix','Plot ROC curve and calculate AUC','Understand precision, recall, F1','Check model calibration','Choose the right metric for your problem'],
  realWorldContext: 'Accuracy is misleading. A 99% accuracy model can be useless (if 99% of data is one class). Companies like Google and Meta use precision/recall/F1 for imbalanced data. ROC curves show the trade-off between true and false positives. Without proper evaluation, you deploy a model that looks good but fails in production.',
  prerequisites: ['Completed ML L1-L6'],
  conceptDiagram: `CONFUSION MATRIX:
              Predicted
              No    Yes
Actual No  | TN  | FP |
Actual Yes | FN  | TP |

  Precision = TP / (TP + FP)  ← of predicted positives, how many correct?
  Recall    = TP / (TP + FN)  ← of actual positives, how many found?
  F1        = 2 * P * R / (P + R)  ← harmonic mean

  ROC CURVE: True Positive Rate vs False Positive Rate
  AUC = area under ROC (0.5 = random, 1.0 = perfect)
  
  CALIBRATION: predicted probability matches actual frequency
  (90% confidence = correct 90% of the time)`,
  conceptExplanation: ['Accuracy = (TP+TN)/(total). Misleading for imbalanced data: 99% negative class → 99% accuracy by predicting all negative. Use precision/recall/F1 instead.','Precision: of predicted positives, how many are actually positive? (spam filter: high precision = few false alarms). Recall: of actual positives, how many did we find? (cancer detection: high recall = few missed cases). Trade-off: increase recall → decrease precision.','ROC AUC: probability that model ranks a random positive higher than a random negative. 0.5 = random, 1.0 = perfect. AUC > 0.9 = excellent. AUC < 0.7 = poor. Better than accuracy for imbalanced data.'],
  whyItMatters: 'Deploying a model with wrong metrics = disaster. Cancer model with 99% accuracy but 0% recall (misses all cancer) = patients die. Spam filter with 50% precision (half of flagged emails are not spam) = users miss important emails. Proper evaluation prevents this.',
  codeExamples: [
    { filename: 'evaluate.py', language: 'python', approach: 'real-world', code: `from sklearn.metrics import (
    confusion_matrix, classification_report,
    roc_auc_score, roc_curve, precision_recall_curve,
    brier_score_loss,
)
import matplotlib.pyplot as plt

# Predictions
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]  # probabilities

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)

# Full report (precision, recall, F1)
print(classification_report(y_test, y_pred))

# ROC AUC
auc = roc_auc_score(y_test, y_prob)
print(f"ROC AUC: {auc:.4f}")

# Plot ROC curve
fpr, tpr, _ = roc_curve(y_test, y_prob)
plt.plot(fpr, tpr, label=f"AUC = {auc:.3f}")
plt.plot([0, 1], [0, 1], "k--")  # random
plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")
plt.title("ROC Curve")
plt.legend()
plt.savefig("roc_curve.png")

# Calibration (Brier score — lower is better)
brier = brier_score_loss(y_test, y_prob)
print(f"Brier Score: {brier:.4f} (0=perfect, 1=worst)")`,
      explanation: 'confusion_matrix: TP/TN/FP/FN. classification_report: precision/recall/F1 per class. roc_auc_score: AUC. brier_score: calibration (do predicted probabilities match reality?).' },
  ],
  configFiles: [],
  lab: { title: 'Evaluate a Model', steps: [{ step: 1, title: 'Train model', instruction: 'Train on imbalanced data', command: 'Train a model on imbalanced dataset' }, { step: 2, title: 'Evaluate', instruction: 'Calculate all metrics', command: 'Run classification_report, roc_auc_score' }, { step: 3, title: 'Plot', instruction: 'Visualize', command: 'Plot ROC curve, confusion matrix', verification: 'Understand why accuracy is misleading' }] },
  commonErrors: [{ error: '99% accuracy but model is useless', fix: 'Check class balance: if 99% is class 0, predicting all 0 gives 99% accuracy. Use precision/recall/F1/ROC AUC instead of accuracy for imbalanced data.', rootCause: 'Accuracy is dominated by the majority class. For imbalanced data (1% fraud), use precision/recall/F1. AUC is threshold-independent.' }],
  quiz: [{ question: 'When use recall over precision?', options: ['Always', 'When missing positives is costly (cancer detection — better to false alarm than miss)', 'When false alarms are costly', 'Never'], correctIndex: 1, explanation: 'High recall = find all positives (even if some are false alarms). Cancer detection: recall > precision (better to biopsy healthy tissue than miss cancer). Spam filter: precision > recall (better to miss spam than flag important email).' }],
  resources: [{ title: 'sklearn Metrics', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', type: 'docs' }],
  whatToReadNext: 'Read about A/B Testing (next lesson) — statistical significance.',
};

export const mlL8: Lesson = {
  slug: 'ab-testing', title: 'A/B Testing Models — Statistical Significance',
  subtitle: 'Compare models in production with A/B testing',
  duration: 65, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'ml',
  objectives: ['Design A/B tests for ML models','Calculate sample size and duration','Measure statistical significance','Handle network effects','Decide when to ship new model'],
  realWorldContext: 'You built a new model. Is it actually better? A/B test: 50% of users get model A, 50% get model B. Measure which performs better. Companies like Netflix and Amazon A/B test every model change. Without A/B testing, you ship models based on offline metrics (which do not always correlate with real-world performance).',
  prerequisites: ['Completed ML L1-L7'],
  conceptDiagram: `A/B TEST:
  50% users → Model A (current)
  50% users → Model B (new)
  
  Measure: conversion rate, click-through rate, revenue
  
  STATISTICAL SIGNIFICANCE:
  p-value < 0.05 → difference is real (not random)
  Effect size → how much better?
  Sample size → enough data to detect effect?
  
  DURATION: typically 1-4 weeks
  (shorter = faster decisions, longer = more reliable)`,
  conceptExplanation: ['A/B test: split users into control (current model) and treatment (new model). Measure business metrics (conversion, revenue). Statistical significance (p < 0.05) tells you the difference is real, not random noise.','Sample size: need enough users to detect the effect. Small effect (1% improvement) needs millions of users. Large effect (10% improvement) needs fewer. Use power analysis to calculate required sample size before starting.','Pitfalls: peeking (checking results too early = false positives), network effects (users talk to each other), novelty effect (users click because it is new, not better). Run for full duration, do not stop early.'],
  whyItMatters: 'Offline metrics (accuracy, F1) do not always correlate with business outcomes. A model with 95% accuracy might generate less revenue than one with 90% accuracy. A/B testing tells you what actually works in production. Without it, you ship models that look good on paper but hurt the business.',
  codeExamples: [
    { filename: 'ab_test.py', language: 'python', approach: 'real-world', code: `from scipy import stats
import numpy as np

# A/B test results
# Group A (current model): 10000 users, 500 conversions (5%)
# Group B (new model): 10000 users, 580 conversions (5.8%)
conversions_a = 500
conversions_b = 580
n_a = 10000
n_b = 10000

# Conversion rates
rate_a = conversions_a / n_a  # 5.0%
rate_b = conversions_b / n_b  # 5.8%
print(f"Rate A: {rate_a:.4f}, Rate B: {rate_b:.4f}")
print(f"Improvement: {(rate_b - rate_a) / rate_a * 100:.1f}%")

# Statistical test (two-proportion z-test)
from statsmodels.stats.proportion import proportions_ztest
count = [conversions_b, conversions_a]
nobs = [n_b, n_a]
z_stat, p_value = proportions_ztest(count, nobs)
print(f"Z-statistic: {z_stat:.4f}")
print(f"P-value: {p_value:.4f}")

if p_value < 0.05:
    print("SIGNIFICANT: Model B is better (ship it!)")
else:
    print("NOT SIGNIFICANT: difference could be random (need more data)")

# Confidence interval
from statsmodels.stats.proportion import confint_proportions_2indep
ci = confint_proportions_2indep(conversions_b, n_b, conversions_a, n_a)
print(f"95% CI: [{ci[0]:.4f}, {ci[1]:.4f}]")`,
      explanation: 'A/B test: compare conversion rates. proportions_ztest for statistical significance. p < 0.05 = significant (ship it). Confidence interval shows range of improvement.' },
  ],
  configFiles: [],
  lab: { title: 'Analyze A/B Test', steps: [{ step: 1, title: 'Collect data', instruction: 'Run A/B test', command: 'Split traffic 50/50 between model A and B' }, { step: 2, title: 'Analyze', instruction: 'Statistical test', command: 'Run proportions_ztest, check p-value' }, { step: 3, title: 'Decide', instruction: 'Ship or not?', command: 'If p < 0.05 and effect > 0 → ship new model', verification: 'Decision backed by statistics' }] },
  commonErrors: [{ error: 'Peeking: stopping test early when p < 0.05', fix: 'Do NOT check p-value until the planned sample size is reached. Peeking inflates false positive rate. Decide duration BEFORE starting, wait until done.', rootCause: 'Checking results repeatedly increases chance of finding a "significant" result by pure chance. This is called multiple testing problem.' }],
  quiz: [{ question: 'Why A/B test instead of comparing offline metrics?', options: ['Offline is enough', 'Offline metrics (accuracy) do not always correlate with business outcomes (revenue, engagement)', 'A/B is faster', 'Required'], correctIndex: 1, explanation: 'A model with higher accuracy might generate less revenue. A/B testing measures real-world impact. Offline metrics are necessary but not sufficient — always validate with A/B test.' }],
  resources: [{ title: 'A/B Testing Guide', url: 'https://en.wikipedia.org/wiki/A/B_testing', type: 'article' }],
  whatToReadNext: 'Read about ONNX Export (next lesson).',
};

export const mlL9: Lesson = {
  slug: 'onnx-export', title: 'ONNX Export — PyTorch/TF to ONNX Runtime',
  subtitle: 'Export models to ONNX for faster inference',
  duration: 60, difficulty: 'Advanced', phase: 'Advanced', xp: 150, moduleSlug: 'ml',
  objectives: ['Export PyTorch model to ONNX format','Run inference with ONNX Runtime','Benchmark ONNX vs PyTorch speed','Use dynamic axes for variable batch size','Handle model quantization'],
  realWorldContext: 'ONNX Runtime is 2-5x faster than PyTorch for inference. Companies like Microsoft (which created ONNX) use it for all production inference. ONNX is framework-agnostic: train in PyTorch, serve in C++, JavaScript, or any language. This is the standard for production ML serving.',
  prerequisites: ['Completed ML L1-L8'],
  conceptDiagram: `ONNX EXPORT:
  PyTorch model → torch.onnx.export() → model.onnx
  model.onnx → ONNX Runtime → predictions

  BENEFITS:
  • 2-5x faster than PyTorch for inference
  • Framework-agnostic (serve in C++, JS, Java)
  • Smaller file size
  • Hardware acceleration (GPU, TensorRT)
  • Quantization (int8 — 4x smaller, 2x faster)`,
  conceptExplanation: ['ONNX (Open Neural Network Exchange) is a standard format for ML models. Export from PyTorch, TensorFlow, scikit-learn. Run with ONNX Runtime — optimized C++ backend with graph optimizations.','ONNX Runtime is 2-5x faster than PyTorch because: graph optimizations (fuse operations), quantization (int8 instead of float32), hardware acceleration (TensorRT, OpenVINO). Same accuracy, faster inference.','Dynamic axes: export with variable batch size. dynamic_axes={"input": {0: "batch_size"}}. This lets you run inference on 1 or 1000 samples with the same ONNX model. Without it, batch size is fixed at export time.'],
  whyItMatters: 'PyTorch is designed for training (flexible, dynamic). ONNX Runtime is designed for inference (optimized, fast). In production, you want the fastest inference. ONNX is 2-5x faster = 2-5x more requests per second = 2-5x less servers = cost savings.',
  codeExamples: [
    { filename: 'export.py', language: 'python', approach: 'real-world', code: `import torch
import onnxruntime as ort
import numpy as np
import time

# Export PyTorch to ONNX
model.eval()  # CRITICAL: eval mode
dummy_input = torch.randn(1, 3, 224, 224)  # example input

torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={
        "input": {0: "batch_size"},   # variable batch
        "output": {0: "batch_size"},
    },
    opset_version=14,
)

# Load and run with ONNX Runtime
session = ort.InferenceSession("model.onnx", providers=["CUDAExecutionProvider"])
input_name = session.get_inputs()[0].name

# Inference (numpy, not torch!)
input_data = np.random.randn(32, 3, 224, 224).astype(np.float32)
outputs = session.run(None, {input_name: input_data})
print(outputs[0].shape)  # (32, 10)

# Benchmark: PyTorch vs ONNX
# PyTorch
start = time.perf_counter()
for _ in range(100):
    with torch.no_grad():
        _ = model(torch.randn(32, 3, 224, 224))
torch_time = time.perf_counter() - start

# ONNX
start = time.perf_counter()
for _ in range(100):
    _ = session.run(None, {input_name: np.random.randn(32, 3, 224, 224).astype(np.float32)})
onnx_time = time.perf_counter() - start

print(f"PyTorch: {torch_time:.3f}s")
print(f"ONNX:    {onnx_time:.3f}s")
print(f"ONNX is {torch_time/onnx_time:.1f}x faster!")`,
      explanation: 'Export with dynamic axes (variable batch). ONNX Runtime uses numpy arrays. Benchmark: ONNX is typically 2-5x faster than PyTorch for inference.' },
  ],
  configFiles: [],
  lab: { title: 'Export and Benchmark', steps: [{ step: 1, title: 'Export', instruction: 'Convert PyTorch to ONNX', command: 'torch.onnx.export(model, dummy, "model.onnx", dynamic_axes=...)' }, { step: 2, title: 'Load', instruction: 'Load ONNX Runtime', command: 'session = ort.InferenceSession("model.onnx")' }, { step: 3, title: 'Benchmark', instruction: 'Compare speed', command: 'Time 100 inferences with PyTorch vs ONNX', expectedOutput: 'ONNX is 2-5x faster!' }] },
  commonErrors: [{ error: 'ONNX export fails with "Unsupported operator"', fix: 'Check opset_version. Some operations need newer opset (14+). Use torch.onnx.export with opset_version=14 or higher.', rootCause: 'ONNX opset version too old for the operation. Newer PyTorch operations need newer opset versions.' }],
  quiz: [{ question: 'Why is ONNX Runtime faster than PyTorch?', options: ['Better algorithms', 'Graph optimizations (fuse ops), quantization, hardware acceleration (C++ backend)', 'Uses GPU', 'Smaller models'], correctIndex: 1, explanation: 'ONNX Runtime optimizes the computation graph (fuses operations), supports quantization (int8), and has hardware-specific acceleration (TensorRT, OpenVINO). PyTorch is optimized for training flexibility, not inference speed.' }],
  resources: [{ title: 'ONNX Runtime', url: 'https://onnxruntime.ai/', type: 'docs' }],
  whatToReadNext: 'Read about FastAPI Model Serving (next lesson).',
};

export const mlL10: Lesson = {
  slug: 'fastapi-serving', title: 'FastAPI Model Serving — Batch, Async, GPU',
  subtitle: 'Serve ML models as production APIs',
  duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'ml',
  objectives: ['Load model ONCE at startup (lifespan)','Serve predictions via FastAPI','Batch requests for 10-100x throughput','Use ONNX Runtime for inference','Add input validation with Pydantic'],
  realWorldContext: 'FastAPI is the go-to framework for ML serving. Uber, Netflix, and Microsoft use it. The pattern: load model at startup, serve predictions. Loading per request is 1000x slower. Batch requests give 10-100x throughput. This is how production ML APIs work.',
  prerequisites: ['Completed ML L1-L9','FastAPI knowledge'],
  conceptDiagram: `ML SERVING PATTERN:
  Startup (lifespan): load model ONCE → app.state.model
  Request: POST /predict → validate input → inference → return
  
  CRITICAL: model loaded ONCE, reused for ALL requests
  Loading per request = 1000x slower!
  
  OPTIMIZATION:
  • ONNX Runtime (2-5x faster than PyTorch)
  • Batch requests (10-100x throughput)
  • GPU inference (CUDA)
  • torch.no_grad() (no gradient tracking)`,
  conceptExplanation: ['Load model ONCE in lifespan context manager. Store in app.state.model. Access in routes. Loading takes 1-10 seconds — doing it per request makes the API unusable.','Input validation: Pydantic validates input shape (784 features), type (float32), range (0-1). Invalid input returns 422 BEFORE the model runs. This prevents crashes from bad input.','Batch requests: process 32 inputs in one forward pass (GPU parallelism). 10-100x faster than individual requests. Use /predict/batch endpoint with list of inputs.'],
  whyItMatters: 'A model in a notebook is useless. It needs an API. FastAPI + ONNX is the industry standard. Without proper serving (load once, batch, validate), your API is slow (1 req/s) and crashes on bad input. With it, you handle 1000 req/s on a single GPU.',
  codeExamples: [
    { filename: 'serve.py', language: 'python', approach: 'production', code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from contextlib import asynccontextmanager
import onnxruntime as ort
import numpy as np
import time

# Input/output schemas
class PredictRequest(BaseModel):
    features: list[float] = Field(min_length=784, max_length=784,
                                  description="784 normalized pixel values")

class PredictResponse(BaseModel):
    prediction: int
    confidence: float
    inference_time_ms: float

# Load model ONCE at startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    session = ort.InferenceSession("model.onnx", providers=["CUDAExecutionProvider"])
    app.state.session = session
    app.state.input_name = session.get_inputs()[0].name
    print(f"Model loaded. Providers: {session.get_providers()}")
    yield
    del app.state.session

app = FastAPI(lifespan=lifespan)

@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    start = time.perf_counter()
    
    # Convert to numpy (ONNX uses numpy, not torch)
    features = np.array(req.features, dtype=np.float32).reshape(1, 784)
    
    # Inference
    outputs = app.state.session.run(None, {app.state.input_name: features})
    probs = softmax(outputs[0][0])
    prediction = int(probs.argmax())
    
    elapsed = (time.perf_counter() - start) * 1000
    return PredictResponse(
        prediction=prediction,
        confidence=float(probs[prediction]),
        inference_time_ms=round(elapsed, 2),
    )

@app.post("/predict/batch")
async def predict_batch(features: list[list[float]]):
    """Batch prediction — 10-100x faster than individual."""
    X = np.array(features, dtype=np.float32)  # (batch, 784)
    outputs = app.state.session.run(None, {app.state.input_name: X})
    probs = softmax(outputs[0])
    return {
        "predictions": probs.argmax(axis=1).tolist(),
        "inference_time_ms": round((time.perf_counter() - start) * 1000, 2),
    }

def softmax(x):
    e = np.exp(x - x.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)`,
      explanation: 'Production ML serving: load ONNX at startup, validate with Pydantic, numpy for inference, batch endpoint. This handles 1000+ req/s on a single GPU.' },
  ],
  configFiles: [],
  lab: { title: 'Deploy a Model as API', steps: [{ step: 1, title: 'Export model', instruction: 'Export to ONNX', command: 'torch.onnx.export(model, dummy, "model.onnx")' }, { step: 2, title: 'Create API', instruction: 'Write FastAPI serving app', command: 'Create serve.py with lifespan + /predict' }, { step: 3, title: 'Run', instruction: 'Start server', command: 'uvicorn serve:app --reload' }, { step: 4, title: 'Test', instruction: 'Send prediction', command: 'curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d \'{"features": [0.0]*784}\'', expectedOutput: '{"prediction": 5, "confidence": 0.95, "inference_time_ms": 2.3}' }] },
  commonErrors: [{ error: 'Model loaded per request (1000x slower)', fix: 'Load model in lifespan: @asynccontextmanager async def lifespan(app): app.state.model = load_model(). Store in app.state. Access in routes.', rootCause: 'Loading a model takes 1-10 seconds. If loaded per request, every request waits 1-10s. Load ONCE in lifespan, reuse for all requests.' }],
  quiz: [{ question: 'When should you load the ML model?', options: ['Per request', 'ONCE at startup (lifespan), reuse for all requests', 'Every 100 requests', 'Never'], correctIndex: 1, explanation: 'Loading takes 1-10 seconds. Per request = 1000x slower. Load ONCE in lifespan, store in app.state. Access from routes. This is the #1 ML serving principle.' }],
  resources: [{ title: 'ONNX Runtime', url: 'https://onnxruntime.ai/', type: 'docs' }, { title: 'BentoML', url: 'https://bentoml.com/', type: 'tool', isHiddenGem: true }],
  whatToReadNext: 'Read about Model Registry (next lesson) — versioning, rollback, canary.',
};

// L11-L15 — real content
export const mlL11: Lesson = {
  slug: 'model-registry', title: 'Model Registry — Versioning, Rollback, Canary',
  subtitle: 'Manage model versions in production',
  duration: 70, difficulty: 'Advanced', phase: 'Advanced', xp: 200, moduleSlug: 'ml',
  objectives: ['Register models with versions','Promote models (None → Staging → Production)','Rollback to previous version','Canary deployment (gradual rollout)','Track model lineage'],
  realWorldContext: 'In production, you deploy 50 model versions per year. Without a registry, you have random .pkl files — no versioning, no rollback, no tracking. MLflow Model Registry is the standard. Companies like Uber and Airbnb use it for all production models.',
  prerequisites: ['Completed ML L1-L10'],
  conceptDiagram: `MODEL REGISTRY:
  Register model → version 1, 2, 3...
  Promote: None → Staging → Production
  Rollback: Production v3 → Production v2 (instant)
  
  CANARY DEPLOYMENT:
  10% traffic → new model
  90% traffic → current model
  If metrics good → 50% → 100%
  If metrics bad → rollback (0%)`,
  conceptExplanation: ['Model Registry: register models with versions. Each version has: artifacts (model file), metadata (params, metrics), stage (None/Staging/Production). MLflow Model Registry is the standard.','Promote models through stages: train → register (None) → test (Staging) → deploy (Production). Only one Production version at a time. Rollback = change stage from v3 to v2 (instant, no retraining).','Canary deployment: route 10% of traffic to new model, 90% to current. Monitor metrics (accuracy, latency, business KPIs). If good → increase to 50% → 100%. If bad → rollback to 0%. This prevents bad models from affecting all users.'],
  whyItMatters: 'Without a registry, deploying a new model is risky — you cannot rollback if it is bad. Without canary deployment, a bad model affects 100% of users. These are how production ML teams ship safely.',
  codeExamples: [
    { filename: 'registry.py', language: 'python', approach: 'real-world', code: `import mlflow

# Register model
model_uri = "runs:/abc123/model"
result = mlflow.register_model(model_uri, "churn-predictor")
print(f"Registered version: {result.version}")

# Promote to staging
client = mlflow.tracking.MlflowClient()
client.transition_model_version_stage(
    name="churn-predictor",
    version=result.version,
    stage="Staging",
)

# After A/B test, promote to production
client.transition_model_version_stage(
    name="churn-predictor",
    version=result.version,
    stage="Production",
    archive_existing_versions=True,  # archive old production model
)

# Rollback: move previous version back to production
client.transition_model_version_stage(
    name="churn-predictor",
    version=2,  # previous version
    stage="Production",
)

# Load production model
model = mlflow.pyfunc.load_model(
    model_uri="models:/churn-predictor/Production"
)
# Always loads the current production version!`,
      explanation: 'MLflow Model Registry: register, promote (Staging → Production), rollback (switch version). Load production model by name: models:/churn-predictor/Production.' },
  ],
  configFiles: [],
  lab: { title: 'Register and Deploy a Model', steps: [{ step: 1, title: 'Register', instruction: 'Register model in MLflow', command: 'mlflow.register_model(run_uri, "my-model")' }, { step: 2, title: 'Promote', instruction: 'Move to staging then production', command: 'transition_model_version_stage(..., "Production")' }, { step: 3, title: 'Rollback', instruction: 'Revert to previous version', command: 'transition previous version to Production' }] },
  commonErrors: [{ error: 'Cannot rollback (old model deleted)', fix: 'Never delete model versions. Archive them instead. MLflow keeps all versions — you can always rollback.', rootCause: 'If you delete old models, you cannot rollback. Always archive, never delete. Model registry keeps all versions.' }],
  quiz: [{ question: 'What is canary deployment?', options: ['Deploy to canary islands', 'Route small % of traffic to new model, increase gradually, rollback if bad', 'Deploy all at once', 'Test in staging only'], correctIndex: 1, explanation: 'Canary: 10% → 50% → 100% traffic to new model. Monitor metrics at each stage. If bad, rollback to 0%. Limits blast radius — bad model only affects 10% of users initially.' }],
  resources: [{ title: 'MLflow Model Registry', url: 'https://mlflow.org/docs/latest/model-registry.html', type: 'docs' }],
  whatToReadNext: 'Read about MLOps Pipeline (next lesson) — GitHub Actions training.',
};

export const mlL12: Lesson = {
  slug: 'mlops-pipeline', title: 'MLOps Pipeline — GitHub Actions Training',
  subtitle: 'Automate ML training and deployment',
  duration: 80, difficulty: 'Advanced', phase: 'Advanced', xp: 250, moduleSlug: 'ml',
  objectives: ['Automate training with GitHub Actions','Trigger retraining on data changes','Run tests on model code','Auto-deploy model after training','Monitor model in production'],
  realWorldContext: 'MLOps = DevOps for ML. When data changes, retrain automatically. When code changes, test automatically. When model is ready, deploy automatically. Companies like Google and Netflix have fully automated ML pipelines. Without MLOps, ML is manual and error-prone.',
  prerequisites: ['Completed ML L1-L11'],
  conceptDiagram: `MLOPS PIPELINE:
  Data updated (DVC) → GitHub Actions triggers:
  1. Pull latest data (dvc pull)
  2. Run tests (pytest)
  3. Train model (python train.py)
  4. Evaluate (accuracy > threshold?)
  5. Register model (MLflow)
  6. Deploy (canary → production)
  
  ALL AUTOMATED. No manual steps.`,
  conceptExplanation: ['MLOps pipeline: data change → trigger CI/CD → train → evaluate → register → deploy. GitHub Actions runs the pipeline. DVC pulls latest data. MLflow tracks the run. Model registry manages versions.','Quality gates: only deploy if accuracy > threshold. If new model is worse than current, do not deploy (fail the pipeline). This prevents bad models from reaching production.','Monitoring in production: track prediction drift (input distribution changes), concept drift (feature→target relationship changes), latency, error rate. If drift detected → trigger retraining. This closes the loop: data → train → deploy → monitor → retrain.'],
  whyItMatters: 'Without MLOps, ML is manual: download data, train, evaluate, deploy — all by hand. Slow, error-prone, not reproducible. With MLOps, everything is automated: data change → retrain → deploy. This is how production ML teams operate at scale.',
  codeExamples: [
    { filename: 'ml-pipeline.yml', language: 'yaml', approach: 'production', code: `name: ML Pipeline
on:
  push:
    paths: ["data/**", "src/**", "configs/**"]
  schedule:
    - cron: "0 2 * * 1"  # weekly retrain (Monday 2 AM)

jobs:
  train:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.12", cache: "pip" }
      
      - run: pip install -e ".[dev]"
      
      # Pull latest data
      - run: dvc pull
      
      # Run tests
      - run: pytest tests/
      
      # Train model
      - run: python src/train.py
        env:
          MLFLOW_TRACKING_URI: \${\{ secrets.MLFLOW_URI }}
      
      # Evaluate (quality gate)
      - run: |
          ACC=$(python -c "import json; print(json.load(open('metrics.json'))['accuracy'])")
          echo "Accuracy: $ACC"
          if (( $(echo "$ACC < 0.90" | bc -l) )); then
            echo "Accuracy below threshold (0.90). Failing."
            exit 1
          fi
      
      # Register model
      - run: python src/register_model.py
        env:
          MLFLOW_TRACKING_URI: \${\{ secrets.MLFLOW_URI }}
      
      # Deploy (canary)
      - run: python src/deploy.py --canary --percentage 10
        env:
          API_URL: \${\{ secrets.API_URL }}`,
      explanation: 'Full MLOps pipeline: trigger on data/code change, pull data, test, train, quality gate (accuracy > 0.90), register, canary deploy. All automated.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up MLOps Pipeline', steps: [{ step: 1, title: 'Create workflow', instruction: 'Write GitHub Actions YAML', command: 'Create .github/workflows/ml-pipeline.yml' }, { step: 2, title: 'Add quality gate', instruction: 'Check accuracy threshold', command: 'Add step that fails if accuracy < 0.90' }, { step: 3, title: 'Test', instruction: 'Push to trigger', command: 'git push', verification: 'Pipeline runs, trains, evaluates' }] },
  commonErrors: [{ error: 'Pipeline deploys bad model', fix: 'Add quality gate: compare new model accuracy to current production model. Only deploy if new > current. Fail pipeline otherwise.', rootCause: 'No quality gate. Always compare new model to current production. Never auto-deploy without checking metrics.' }],
  quiz: [{ question: 'What is MLOps?', options: ['ML operations', 'DevOps for ML — automate training, deployment, monitoring, retraining', 'A framework', 'A model type'], correctIndex: 1, explanation: 'MLOps applies DevOps principles to ML: version data (DVC), track experiments (MLflow), automate training (CI/CD), monitor production (drift detection), auto-retrain. Full lifecycle automation.' }],
  resources: [{ title: 'MLOps Zoomcamp (free)', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', type: 'article', isHiddenGem: true }],
  whatToReadNext: 'Read about Data Drift Detection (next lesson).',
};

export const mlL13: Lesson = {
  slug: 'data-drift', title: 'Data Drift Detection — Monitor, Alert, Retrain',
  subtitle: 'Detect when your model needs retraining',
  duration: 65, difficulty: 'Advanced', phase: 'Real-World', xp: 200, moduleSlug: 'ml',
  objectives: ['Understand data drift and concept drift','Monitor input distribution changes','Set up drift detection alerts','Trigger automatic retraining','Use evidently or alibi-detect'],
  realWorldContext: 'Models degrade over time. A model trained on 2023 data may not work in 2024 — user behavior changes, new products appear, economy shifts. Companies like Uber and Netflix monitor drift and retrain automatically. Without drift detection, your model silently degrades and predictions get worse.',
  prerequisites: ['Completed ML L1-L12'],
  conceptDiagram: `DRIFT TYPES:
  Data drift: input distribution changes (users get older, new products)
  Concept drift: input→output relationship changes (spam patterns evolve)
  
  DETECTION:
  Compare current input distribution to training distribution
  If significantly different → DRIFT DETECTED → retrain
  
  MONITORING:
  Track: input feature distributions, prediction distributions
  Alert: if drift > threshold → Slack/email → trigger retraining`,
  conceptExplanation: ['Data drift: the input data changes over time. Example: model trained on users aged 18-30, now users are 30-45. Feature distribution shifts. Model makes predictions on data it never saw → degraded performance.','Concept drift: the relationship between features and target changes. Example: spam patterns evolve — words that indicated spam in 2023 are normal in 2024. The model needs retraining even if input distribution is the same.','Detection: compare current input distribution to training distribution using statistical tests (KS test, PSI). If distribution shift > threshold → alert → retrain. Libraries: evidently (reports), alibi-detect (tests).'],
  whyItMatters: 'A model that was 95% accurate at deployment may drop to 80% after 6 months due to drift. Without monitoring, you do not know this is happening. Users get bad predictions, revenue drops, and nobody knows why. Drift detection is how you catch this early.',
  codeExamples: [
    { filename: 'drift.py', language: 'python', approach: 'real-world', code: `from evidently.report import Report
from evidently.metric_preset import DataDriftPreset
import pandas as pd

# Training data (reference)
reference_data = pd.read_csv("data/train.csv")

# Current production data
current_data = pd.read_csv("data/production_latest.csv")

# Generate drift report
report = Report(metrics=[DataDriftPreset()])
report.run(reference_data=reference_data, current_data=current_data)
report.save_html("drift_report.html")

# Check if drift detected
# PSI (Population Stability Index) > 0.2 = significant drift
from alibi_detect.cd import KSDrift
detector = KSDrift(reference_data.values, p_val=0.05)
result = detector.predict(current_data.values)
print(f"Drift detected: {result['data']['is_drift']}")
print(f"p-value: {result['data']['p_val']}")

# If drift → trigger retraining
if result['data']['is_drift']:
    import subprocess
    subprocess.run(["python", "src/train.py", "--retrain"])
    # Or trigger GitHub Actions workflow
    # subprocess.run(["gh", "workflow", "run", "ml-pipeline.yml"])`,
      explanation: 'evidently: generate drift report (HTML). alibi-detect: statistical test (KS test). If drift detected → trigger retraining. This closes the ML loop.' },
  ],
  configFiles: [],
  lab: { title: 'Set Up Drift Detection', steps: [{ step: 1, title: 'Install', instruction: 'Install evidently', command: 'pip install evidently' }, { step: 2, title: 'Generate report', instruction: 'Compare distributions', command: 'Create drift report comparing training vs production data' }, { step: 3, title: 'Alert', instruction: 'Set up alerting', command: 'If drift → send Slack alert → trigger retraining' }] },
  commonErrors: [{ error: 'Model accuracy drops over time', fix: 'Set up drift detection. Compare current input distribution to training data. If drift > threshold → retrain. This is normal — all models degrade. Monitor and retrain.', rootCause: 'Data drift: input distribution changes over time. Model trained on old data does not generalize to new data. Solution: monitor drift, retrain when detected.' }],
  quiz: [{ question: 'What is data drift?', options: ['Model gets slower', 'Input data distribution changes over time (model trained on old data does not generalize)', 'Data loss', 'Too much data'], correctIndex: 1, explanation: 'Data drift: the distribution of input features changes. Model trained on 2023 data may not work in 2024. Detect with statistical tests (KS, PSI). Retrain when drift is significant.' }],
  resources: [{ title: 'evidently', url: 'https://docs.evidentlyai.com/', type: 'docs' }, { title: 'alibi-detect', url: 'https://docs.seldon.io/projects/alibi-detect/', type: 'docs' }],
  whatToReadNext: 'Read about Distributed Training (next lesson).',
};

export const mlL14: Lesson = {
  slug: 'distributed-training', title: 'Distributed Training — DDP, Multi-GPU',
  subtitle: 'Train on multiple GPUs for faster training',
  duration: 75, difficulty: 'Expert', phase: 'Real-World', xp: 250, moduleSlug: 'ml',
  objectives: ['Understand DataParallel vs DistributedDataParallel','Use torch.distributed for multi-GPU','Use torchrun for launching','Handle gradient synchronization','Scale to multiple machines'],
  realWorldContext: 'Training GPT-4 took 1000+ GPUs. Large models (LLMs, vision) require distributed training. DDP (DistributedDataParallel) is the PyTorch standard. Companies like OpenAI and Meta use distributed training for all large models. Without it, training takes months instead of days.',
  prerequisites: ['Completed ML L1-L13'],
  conceptDiagram: `DISTRIBUTED TRAINING:
  Single GPU: 1 model copy, 1 GPU, slow
  
  DDP (DistributedDataParallel):
  N GPUs, each has full model copy
  Each GPU processes different data batch
  Gradients synchronized across GPUs
  
  GPU 1: batch 1-32 → forward → backward → gradients
  GPU 2: batch 33-64 → forward → backward → gradients
  → All-Reduce: average gradients across GPUs
  → Each GPU updates weights (same result)`,
  conceptExplanation: ['DDP (DistributedDataParallel): each GPU has a full copy of the model. Each processes a different batch. After backward(), gradients are synchronized (All-Reduce average). All GPUs update weights identically. Effective batch size = batch_per_gpu * num_gpus.','torchrun launches multiple processes: torchrun --nproc_per_node=4 train.py. Each process gets one GPU. PyTorch handles communication automatically. No code changes for single-GPU to multi-GPU (almost).','Key: set local_rank (which GPU this process uses), move model to correct GPU, use DistributedSampler for data (each GPU gets different data). DDP wraps model and handles gradient sync.'],
  whyItMatters: 'Training on 1 GPU: 7 days. Training on 4 GPUs: 2 days. Training on 8 GPUs: 1 day. For large models, distributed training is the only option. Without it, you cannot train state-of-the-art models.',
  codeExamples: [
    { filename: 'distributed.py', language: 'python', approach: 'production', code: `import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data import DataLoader, DistributedSampler
import os

def setup():
    dist.init_process_group("nccl")  # NCCL = NVIDIA collective comms
    local_rank = int(os.environ["LOCAL_RANK"])
    torch.cuda.set_device(local_rank)

def cleanup():
    dist.destroy_process_group()

def train():
    setup()
    local_rank = int(os.environ["LOCAL_RANK"])
    
    # Model on this GPU
    model = MyModel().to(local_rank)
    model = DDP(model, device_ids=[local_rank])
    
    # Data: each GPU gets different batch
    sampler = DistributedSampler(dataset)
    dataloader = DataLoader(dataset, batch_size=32, sampler=sampler)
    
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3)
    
    for epoch in range(10):
        sampler.set_epoch(epoch)  # CRITICAL: shuffle differently each epoch
        for batch in dataloader:
            batch = {k: v.to(local_rank) for k, v in batch.items()}
            outputs = model(batch["input"])
            loss = criterion(outputs, batch["label"])
            optimizer.zero_grad()
            loss.backward()  # DDP syncs gradients automatically!
            optimizer.step()
    
    cleanup()

# Launch: torchrun --nproc_per_node=4 train.py
# 4 GPUs, each runs train() with different data`,
      explanation: 'DDP: init_process_group, wrap model with DDP, DistributedSampler (different data per GPU), set_epoch (shuffle). DDP syncs gradients automatically. Launch with torchrun.' },
  ],
  configFiles: [],
  lab: { title: 'Multi-GPU Training', steps: [{ step: 1, title: 'Modify for DDP', instruction: 'Add DDP wrapper', command: 'Add init_process_group, DDP(model), DistributedSampler' }, { step: 2, title: 'Launch', instruction: 'Run with torchrun', command: 'torchrun --nproc_per_node=4 train.py', expectedOutput: '4 processes, each on 1 GPU' }] },
  commonErrors: [{ error: 'All GPUs get same data (no speedup)', fix: 'Use DistributedSampler: sampler=DistributedSampler(dataset). Call sampler.set_epoch(epoch) each epoch for different shuffling.', rootCause: 'Without DistributedSampler, all GPUs get the same batches. DistributedSampler splits data so each GPU gets unique samples.' }],
  quiz: [{ question: 'What does DDP (DistributedDataParallel) do?', options: ['Splits model across GPUs', 'Each GPU has full model, processes different data, gradients synchronized', 'Only for inference', 'Slower than single GPU'], correctIndex: 1, explanation: 'DDP: each GPU has a full model copy. Each processes different data batches. After backward(), gradients are averaged across GPUs (All-Reduce). All GPUs update weights identically. Effective batch size = batch_per_gpu * num_gpus.' }],
  resources: [{ title: 'PyTorch DDP', url: 'https://pytorch.org/tutorials/intermediate/ddp_tutorial.html', type: 'docs' }],
  whatToReadNext: 'Read about Production ML Checklist (final lesson).',
};

export const mlL15: Lesson = {
  slug: 'production-checklist', title: 'Production ML Checklist — 50-point Audit',
  subtitle: 'Ensure your ML system is production-ready',
  duration: 60, difficulty: 'Advanced', phase: 'Real-World', xp: 150, moduleSlug: 'ml',
  objectives: ['Audit your ML system against 50 production criteria','Identify gaps in your ML infrastructure','Understand production requirements','Create an action plan for production readiness','Learn from real production ML failures'],
  realWorldContext: 'Production ML is different from notebook ML. Models crash, data drifts, latency spikes, users abuse the API. This lesson is a 50-point checklist that companies like Google and Meta use to audit ML systems before production deployment. Every point is a real failure that has happened.',
  prerequisites: ['Completed ML L1-L14'],
  conceptDiagram: `PRODUCTION ML CHECKLIST (50 points):

  DATA (10):
  ✓ Data versioned (DVC)
  ✓ Data quality monitored
  ✓ No data leakage
  ✓ Train/test split is temporal (not random)
  ✓ Feature pipeline is reproducible
  ...

  MODEL (10):
  ✓ Model versioned (MLflow)
  ✓ Evaluated on held-out test set
  ✓ Calibrated (if probabilistic)
  ✓ A/B tested before deployment
  ✓ Rolled back mechanism
  ...

  SERVING (10):
  ✓ Model loaded ONCE at startup
  ✓ Input validation (Pydantic)
  ✓ Batch endpoint available
  ✓ Health check endpoint
  ✓ Latency < 100ms p99
  ...

  MONITORING (10):
  ✓ Drift detection
  ✓ Latency monitored
  ✓ Error rate monitored
  ✓ Prediction logging
  ✓ Alerting (Slack/email)
  ...

  INFRASTRUCTURE (10):
  ✓ CI/CD pipeline
  ✓ Dockerized
  ✓ Auto-scaling
  ✓ GPU available (if needed)
  ✓ Backup and recovery`,
  conceptExplanation: ['This checklist covers 5 categories: Data, Model, Serving, Monitoring, Infrastructure. Each point is a real production failure. Missing any point = risk of production incident.','Common failures: model loaded per request (1000x slow), no drift detection (model degrades silently), no rollback (bad model affects all users), no input validation (bad input crashes API), no monitoring (you do not know model is failing).','Run this checklist BEFORE deploying to production. Fix all gaps. After deployment, continuously monitor. This is how ML systems stay reliable.'],
  whyItMatters: 'A model that works in a notebook can fail in production in 50 different ways. This checklist prevents those failures. Every point is a lesson learned from a real production incident. Skip this checklist at your own risk.',
  codeExamples: [
    { filename: 'checklist.py', language: 'python', approach: 'real-world', code: `# Production ML Checklist (automated)

checklist = {
    "Data": [
        "Data versioned (DVC)",
        "Data quality monitored (nulls, outliers)",
        "No data leakage (temporal split for time-series)",
        "Feature pipeline reproducible (sklearn Pipeline)",
        "Data schema documented",
        "PII removed or encrypted",
        "Data refresh pipeline automated",
        "Train/test/val split documented",
        "Class balance checked",
        "Feature importance stable over time",
    ],
    "Model": [
        "Model versioned (MLflow registry)",
        "Evaluated on held-out test set (not validation)",
        "Multiple metrics tracked (accuracy, F1, AUC)",
        "Calibrated (Brier score < 0.1)",
        "A/B tested before full deployment",
        "Rollback mechanism (model registry)",
        "Model card documented (purpose, limitations)",
        "Bias tested across demographic groups",
        "Model size < 500MB (for fast loading)",
        "Inference < 100ms p99",
    ],
    "Serving": [
        "Model loaded ONCE at startup (lifespan)",
        "Input validation (Pydantic)",
        "Batch endpoint available",
        "Health check (/health)",
        "Readiness check (/ready)",
        "Rate limiting configured",
        "CORS configured",
        "Auth required (JWT/API key)",
        "Structured logging (JSON)",
        "Error handling (no 500s to client)",
    ],
    "Monitoring": [
        "Data drift detection (evidently)",
        "Prediction drift detection",
        "Latency monitored (p50, p95, p99)",
        "Error rate monitored",
        "Throughput monitored (req/s)",
        "GPU utilization monitored",
        "Prediction logging (for audit)",
        "Alerting (Slack/email on anomalies)",
        "Dashboard (Grafana)",
        "Model performance vs baseline tracked",
    ],
    "Infrastructure": [
        "CI/CD pipeline (GitHub Actions)",
        "Dockerized (multi-stage build)",
        "Auto-scaling (HPA or cloud auto-scale)",
        "GPU available (if needed)",
        "Backup and recovery tested",
        "Load tested (1000+ concurrent)",
        "Chaos tested (kill pod, network partition)",
        "Documentation (README, runbook)",
        "On-call rotation defined",
        "Disaster recovery plan documented",
    ],
}

# Score
total = sum(len(v) for v in checklist.values())
print(f"Total checks: {total}")
for category, items in checklist.items():
    print(f"\\n{category} ({len(items)} checks):")
    for item in items:
        print(f"  ☐ {item}")`,
      explanation: '50-point checklist: Data (10), Model (10), Serving (10), Monitoring (10), Infrastructure (10). Run before production deployment. Fix all unchecked items.' },
  ],
  configFiles: [],
  lab: { title: 'Audit Your ML System', steps: [{ step: 1, title: 'Run checklist', instruction: 'Go through all 50 points', command: 'Review each item, mark as done or gap' }, { step: 2, title: 'Fix gaps', instruction: 'Address missing items', command: 'Create action plan for each gap' }, { step: 3, title: 'Re-audit', instruction: 'Verify fixes', command: 'Re-run checklist after fixes', verification: 'All 50 points checked' }] },
  commonErrors: [{ error: 'Model works in dev, fails in production', fix: 'Run the 50-point checklist. Common gaps: no input validation (bad input crashes), model loaded per request (slow), no monitoring (silent degradation), no rollback (bad model stuck).', rootCause: 'Production has different requirements than development: bad input, high traffic, data drift, server crashes. The checklist covers all production failure modes.' }],
  quiz: [{ question: 'What is the #1 production ML failure?', options: ['Bad algorithm', 'Model loaded per request (1000x slower than loading once at startup)', 'Wrong framework', 'No GPU'], correctIndex: 1, explanation: 'Loading a model takes 1-10 seconds. Per request = every request waits 1-10s. Load ONCE at startup (lifespan), reuse for all requests. This is the #1 ML serving mistake.' }],
  resources: [{ title: 'Google ML Best Practices', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml', type: 'article', isHiddenGem: true }, { title: 'MLOps Zoomcamp', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', type: 'article' }],
  whatToReadNext: 'Congratulations! You completed the ML Engineering module. Start the capstone project!',
};
