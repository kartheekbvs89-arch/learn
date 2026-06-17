import { Module } from '../types';

export const mlModule: Module = {
  id: 'ml',
  title: 'ML/AI Engineering',
  icon: '🧠',
  color: '#FF6F00',
  gradient: 'linear-gradient(135deg, #FF6F00 0%, #FFC107 100%)',
  description: 'Build, train, and deploy ML models. scikit-learn, PyTorch, TensorFlow, XGBoost, ONNX - from basics to production.',
  level: 'Advanced',
  lessons: [
    {
      id: 'ml-01',
      title: 'ML Fundamentals & scikit-learn',
      subtitle: 'Supervised/unsupervised, train/test split, first model',
      duration: 60,
      difficulty: 'Beginner',
      content: [
        'Machine Learning is teaching computers to learn patterns from data instead of explicit programming. Three main types: supervised (labeled data - classification, regression), unsupervised (no labels - clustering, dimensionality reduction), reinforcement (learn by reward).',
        'The ML workflow: 1) Collect data, 2) Clean and explore, 3) Split into train/test, 4) Choose a model, 5) Train (fit), 6) Evaluate on test set, 7) Tune hyperparameters, 8) Deploy. The biggest leap in modern ML: do steps 1-3 well and even simple models work great.',
        'scikit-learn is the standard library for classical ML (not deep learning). Consistent API: every model has .fit(X, y), .predict(X), .score(X, y). Use train_test_split to divide data, accuracy_score/mean_squared_error for evaluation.',
        'Key concepts: features (inputs), target (output), samples (rows), overfitting (memorize training, fail on test), underfitting (too simple), regularization (prevent overfitting), cross-validation (robust evaluation).'
      ],
      codeExamples: [
        {
          filename: 'sklearn_basics.py',
          language: 'python',
          code: '# pip install scikit-learn pandas numpy\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, classification_report\nimport numpy as np\n\n# Load dataset\niris = load_iris()\nX, y = iris.data, iris.target  # features, target\nprint(f"Features: {iris.feature_names}")\nprint(f"Classes: {iris.target_names}")\nprint(f"Shape: {X.shape}")  # (150, 4) - 150 samples, 4 features\n\n# Split into train (80%) and test (20%)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42, stratify=y\n)\n\n# Train a model\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)  # train\n\n# Predict\ny_pred = model.predict(X_test)\n\n# Evaluate\naccuracy = accuracy_score(y_test, y_pred)\nprint(f"Accuracy: {accuracy:.2%}")\nprint(classification_report(y_test, y_pred, target_names=iris.target_names))\n\n# Feature importance\nfor name, imp in zip(iris.feature_names, model.feature_importances_):\n    print(f"{name}: {imp:.3f}")\n\n# Predict new sample\nnew_sample = np.array([[5.1, 3.5, 1.4, 0.2]])\nprediction = model.predict(new_sample)\nprint(f"Predicted class: {iris.target_names[prediction[0]]}")',
          explanation: 'The sklearn API: .fit() trains, .predict() infers, .score() evaluates. Always split train/test before training to detect overfitting.'
        },
        {
          filename: 'preprocessing.py',
          language: 'python',
          code: 'from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import cross_val_score\nimport numpy as np\n\n# Sample data with missing values\nX = np.array([[1, 2], [np.nan, 3], [7, 6], [4, np.nan]])\n\n# Impute missing values\nimputer = SimpleImputer(strategy="mean")\nX_imputed = imputer.fit_transform(X)\n\n# Scale features (important for many models)\nscaler = StandardScaler()  # zero mean, unit variance\nX_scaled = scaler.fit_transform(X_imputed)\n\n# Or MinMax (0-1 range)\nminmax = MinMaxScaler()\nX_norm = minmax.fit_transform(X_imputed)\n\n# Encode labels (strings -> numbers)\nlabels = ["cat", "dog", "cat", "bird"]\nle = LabelEncoder()\ny = le.fit_transform(labels)  # [0, 1, 0, 2]\nprint(le.inverse_transform([0, 1, 2]))  # [\'bird\', \'cat\', \'dog\']\n\n# Pipeline - chain preprocessing + model\nfrom sklearn.linear_model import LogisticRegression\n\npipeline = Pipeline([\n    ("imputer", SimpleImputer(strategy="median")),\n    ("scaler", StandardScaler()),\n    ("model", LogisticRegression()),\n])\n\n# Cross-validation - more robust than single split\nscores = cross_val_score(pipeline, X, y, cv=5)  # 5-fold CV\nprint(f"CV accuracy: {scores.mean():.2%} ± {scores.std():.2%}")\n\n# Save and load models\nimport joblib\njoblib.dump(pipeline, "model.pkl")\nloaded = joblib.load("model.pkl")',
          explanation: 'Preprocess data: impute missing values, scale features, encode labels. Use Pipeline to chain steps (prevents data leakage). Cross-validation gives robust estimates.'
        },
      ],
      exercises: [
        {
          prompt: 'Load the wine dataset (sklearn.datasets.load_wine), train a RandomForest, and report 5-fold CV accuracy.',
          starterCode: 'from sklearn.datasets import load_wine\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score\n\n# your code\n',
          hint: 'Same pattern as iris example.',
          solution: 'from sklearn.datasets import load_wine\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score\n\nwine = load_wine()\nX, y = wine.data, wine.target\n\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nscores = cross_val_score(model, X, y, cv=5)\nprint(f"CV accuracy: {scores.mean():.2%} +/- {scores.std():.2%}")',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is overfitting?',
          options: ['Model is too simple', 'Model memorizes training data, fails on test', 'Model has too few parameters', 'Model is perfect'],
          correctIndex: 1,
          explanation: 'Overfitting: model learns training data too well (including noise), fails to generalize to new data. Detect with a held-out test set.'
        },
        {
          question: 'Why use train_test_split?',
          options: ['Speeds up training', 'Evaluates model on unseen data', 'Required by sklearn', 'Reduces overfitting'],
          correctIndex: 1,
          explanation: 'Holding out test data lets you evaluate on unseen data, detecting overfitting. Train on train, evaluate on test.'
        },
        {
          question: 'Why use a Pipeline?',
          options: ['Faster', 'Prevents data leakage (fit scaler on train only, apply to test)', 'Required by sklearn', 'For visualization'],
          correctIndex: 1,
          explanation: 'Pipeline fits preprocessing on train and applies to test - preventing leakage of test data into training.'
        }
      ],
      keyTakeaways: [
        'Three ML types: supervised, unsupervised, reinforcement',
        'sklearn API: .fit() trains, .predict() infers, .score() evaluates',
        'Always split train/test before training to detect overfitting',
        'Preprocess: impute missing, scale features, encode labels',
        'Use Pipeline to chain preprocessing + model (prevents leakage)',
        'Cross-validation gives more robust estimates than single split'
      ],
      resources: [
        { title: 'scikit-learn Documentation', url: 'https://scikit-learn.org/', type: 'docs' },
        { title: 'Hands-On ML Book', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/', type: 'book' },
        { title: 'scikit-learn Cheat Sheet', url: 'https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html', type: 'cheatsheet', isHiddenGem: true },
      ]
    },

    {
      id: 'ml-02',
      title: 'PyTorch - Deep Learning from Scratch',
      subtitle: 'Tensors, autograd, build a neural network, train it',
      duration: 90,
      difficulty: 'Advanced',
      content: [
        'PyTorch is the most popular deep learning framework for research and production. Created by Facebook/Meta in 2016. Key features: dynamic computation graphs (eager execution), Pythonic API, strong GPU support, and excellent for both research (flexible) and production (TorchScript, TorchServe).',
        'A tensor is a multi-dimensional array (like NumPy ndarray) that can run on GPU. Tensors track gradients automatically (autograd). Build models with nn.Module - define layers in __init__, forward pass in forward().',
        'Training loop: 1) Forward pass (compute predictions), 2) Compute loss, 3) Backward pass (compute gradients), 4) Optimizer step (update weights), 5) Zero gradients. Repeat for many epochs (full passes through data).',
        'Use torchvision for image datasets and pretrained models (ResNet, VGG, EfficientNet). Use torch.utils.data.DataLoader for batching and shuffling. For production, export to ONNX or use TorchScript.'
      ],
      codeExamples: [
        {
          filename: 'pytorch_basics.py',
          language: 'python',
          code: '# pip install torch torchvision\nimport torch\nimport torch.nn as nn\n\n# Tensors - like NumPy but GPU-accelerated\nx = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)\ny = torch.rand(2, 2)\nprint(x + y)\nprint(x @ y)  # matrix multiply\nprint(x.shape, x.dtype, x.device)\n\n# Move to GPU if available\ndevice = "cuda" if torch.cuda.is_available() else "cpu"\nx = x.to(device)\n\n# Autograd - automatic differentiation\nx = torch.tensor(2.0, requires_grad=True)\ny = x ** 2 + 3 * x + 1  # y = x^2 + 3x + 1\ny.backward()  # compute gradients\nprint(x.grad)  # dy/dx = 2x + 3 = 7 (at x=2)\n\n# Build a neural network\nclass MLP(nn.Module):\n    def __init__(self, input_size, hidden_size, num_classes):\n        super().__init__()\n        self.fc1 = nn.Linear(input_size, hidden_size)\n        self.relu = nn.ReLU()\n        self.fc2 = nn.Linear(hidden_size, num_classes)\n\n    def forward(self, x):\n        x = self.relu(self.fc1(x))\n        return self.fc2(x)\n\nmodel = MLP(784, 128, 10).to(device)\nprint(sum(p.numel() for p in model.parameters()))  # param count\n\n# Loss and optimizer\ncriterion = nn.CrossEntropyLoss()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)',
          explanation: 'Tensors are GPU arrays with autograd. nn.Module is the base class for models. Define layers in __init__, compute in forward().'
        },
        {
          filename: 'train_loop.py',
          language: 'python',
          code: 'import torch\nfrom torch.utils.data import DataLoader, TensorDataset\n\n# Sample data\nX = torch.randn(1000, 784)  # 1000 samples, 784 features\ny = torch.randint(0, 10, (1000,))  # 10 classes\ndataset = TensorDataset(X, y)\nloader = DataLoader(dataset, batch_size=32, shuffle=True)\n\n# Training loop\nmodel.train()  # set training mode\nfor epoch in range(10):\n    total_loss = 0\n    for batch_X, batch_y in loader:\n        batch_X, batch_y = batch_X.to(device), batch_y.to(device)\n\n        # 1. Forward pass\n        outputs = model(batch_X)\n        loss = criterion(outputs, batch_y)\n\n        # 2. Backward pass\n        optimizer.zero_grad()  # CRITICAL: clear old gradients\n        loss.backward()        # compute new gradients\n\n        # 3. Update weights\n        optimizer.step()\n\n        total_loss += loss.item()\n\n    print(f"Epoch {epoch+1}, Loss: {total_loss/len(loader):.4f}")\n\n# Evaluation\nmodel.eval()  # set eval mode (disables dropout, batchnorm uses running stats)\ncorrect = 0\nwith torch.no_grad():  # no gradients needed for inference\n    for batch_X, batch_y in loader:\n        outputs = model(batch_X.to(device))\n        predicted = outputs.argmax(dim=1)\n        correct += (predicted == batch_y.to(device)).sum().item()\nprint(f"Accuracy: {correct/len(dataset):.2%}")\n\n# Save and load\ntorch.save(model.state_dict(), "model.pth")\nmodel.load_state_dict(torch.load("model.pth"))',
          explanation: 'Standard training loop: forward, loss, zero_grad, backward, step. Always call zero_grad before backward! Use model.eval() and torch.no_grad() for inference.'
        },
      ],
      exercises: [
        {
          prompt: 'Create a simple CNN for MNIST (1 channel, 28x28 images). Use 2 conv layers + 2 linear layers.',
          starterCode: 'import torch.nn as nn\n\nclass MNIST_CNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        # your layers\n\n    def forward(self, x):\n        # your forward\n        return x\n',
          hint: 'Conv2d(1, 16, 3, padding=1) -> ReLU -> MaxPool2d(2) -> Conv2d(16, 32, 3, padding=1) -> ReLU -> MaxPool2d(2) -> flatten -> Linear(32*7*7, 10).',
          solution: 'import torch.nn as nn\nimport torch.nn.functional as F\n\nclass MNIST_CNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv1 = nn.Conv2d(1, 16, 3, padding=1)\n        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)\n        self.fc1 = nn.Linear(32 * 7 * 7, 128)\n        self.fc2 = nn.Linear(128, 10)\n\n    def forward(self, x):\n        x = F.max_pool2d(F.relu(self.conv1(x)), 2)  # 28->14\n        x = F.max_pool2d(F.relu(self.conv2(x)), 2)  # 14->7\n        x = x.view(x.size(0), -1)  # flatten\n        x = F.relu(self.fc1(x))\n        return self.fc2(x)\n\nmodel = MNIST_CNN()\nout = model(torch.randn(1, 1, 28, 28))\nprint(out.shape)  # torch.Size([1, 10])',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does optimizer.zero_grad() do?',
          options: ['Resets the optimizer', 'Clears accumulated gradients from previous backward passes', 'Sets learning rate to 0', 'Required only once'],
          correctIndex: 1,
          explanation: 'PyTorch accumulates gradients by default. You MUST zero_grad before each backward() or gradients accumulate across batches.'
        },
        {
          question: 'When should you use torch.no_grad()?',
          options: ['During training', 'During inference/evaluation', 'Always', 'Never'],
          correctIndex: 1,
          explanation: 'no_grad() disables gradient tracking, saving memory and time. Use during inference or evaluation when you do not need gradients.'
        },
        {
          question: 'What does model.eval() do?',
          options: ['Same as no_grad', 'Disables dropout and uses running batchnorm stats', 'Saves the model', 'Prints model info'],
          correctIndex: 1,
          explanation: 'eval() switches to inference mode: dropout is disabled, batchnorm uses running statistics instead of batch statistics.'
        }
      ],
      keyTakeaways: [
        'Tensors are GPU arrays with automatic differentiation (autograd)',
        'Build models with nn.Module: layers in __init__, forward in forward()',
        'Training loop: forward, loss, zero_grad, backward, step',
        'Always call optimizer.zero_grad() before backward()!',
        'Use model.eval() and torch.no_grad() for inference',
        'Save/load with torch.save(model.state_dict())'
      ],
      resources: [
        { title: 'PyTorch Documentation', url: 'https://pytorch.org/docs/', type: 'docs' },
        { title: 'PyTorch Tutorial', url: 'https://pytorch.org/tutorials/', type: 'article' },
        { title: 'Deep Learning with PyTorch (free)', url: 'https://pytorch.org/assets/deep-learning/Deep-Learning-with-PyTorch.pdf', type: 'book', isHiddenGem: true },
      ]
    },

    {
      id: 'ml-03',
      title: 'Production ML - ONNX, Serving, MLOps',
      subtitle: 'Export models, serve with FastAPI, monitoring, versioning',
      duration: 60,
      difficulty: 'Advanced',
      content: [
        'ONNX (Open Neural Network Exchange) is an interchange format for ML models. Export PyTorch/TensorFlow/scikit-learn to ONNX, then run with ONNX Runtime (faster inference, works in any language: Python, C++, Java, JS, C#). One model, many runtimes.',
        'ML serving patterns: 1) Embedded (model in API - simple, low latency), 2) Batch (offline predictions stored in DB), 3) Microservice (separate model server like TorchServe, TF Serving, Triton), 4) Streaming (model consumes from Kafka, publishes predictions).',
        'MLOps is DevOps for ML. Key practices: version data (DVC), version models (MLflow), track experiments (Weights & Biases, MLflow), monitor in production (drift detection, performance metrics), automate retraining, A/B test models.',
        'Common production issues: data drift (input distribution changes), concept drift (relationship between features and target changes), model staleness (needs retraining), latency requirements, scalability. Monitor prediction confidence and input distributions.'
      ],
      codeExamples: [
        {
          filename: 'onnx_export.py',
          language: 'python',
          code: '# pip install onnx onnxruntime\nimport torch\nimport onnxruntime as ort\nimport numpy as np\n\n# Export PyTorch model to ONNX\ndummy_input = torch.randn(1, 784)  # example input\ntorch.onnx.export(\n    model,  # PyTorch model\n    dummy_input,\n    "model.onnx",\n    input_names=["input"],\n    output_names=["output"],\n    dynamic_axes={\n        "input": {0: "batch_size"},  # variable batch size\n        "output": {0: "batch_size"},\n    },\n    opset_version=14,\n)\n\n# Load and run with ONNX Runtime (faster than PyTorch for inference)\nsession = ort.InferenceSession("model.onnx")\ninput_name = session.get_inputs()[0].name\n\n# Run inference (input must be numpy)\nX_test = np.random.randn(5, 784).astype(np.float32)\npredictions = session.run(None, {input_name: X_test})\nprint(predictions[0].shape)  # (5, 10)\n\n# ONNX Runtime is 2-5x faster than PyTorch for inference\n# and works in any language: C++, Java, JavaScript, C#',
          explanation: 'ONNX is an interchange format. Export from PyTorch/TF/sklearn, run with ONNX Runtime (fast, cross-language). Perfect for production inference.'
        },
        {
          filename: 'ml_serving.py',
          language: 'python',
          code: 'from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nimport numpy as np\nimport onnxruntime as ort\nfrom typing import List\n\napp = FastAPI(title="ML Inference API")\n\n# Load model at startup\nsession = ort.InferenceSession("model.onnx")\ninput_name = session.get_inputs()[0].name\n\nclass PredictRequest(BaseModel):\n    features: List[List[float]]  # batch of feature vectors\n\nclass PredictResponse(BaseModel):\n    predictions: List[int]\n    probabilities: List[List[float]]\n\n@app.get("/health")\nasync def health():\n    return {"status": "healthy", "model": "mnist_cnn_v1"}\n\n@app.post("/predict", response_model=PredictResponse)\nasync def predict(request: PredictRequest):\n    if not request.features:\n        raise HTTPException(400, "No features provided")\n\n    X = np.array(request.features, dtype=np.float32)\n\n    # Inference\n    outputs = session.run(None, {input_name: X})\n    logits = outputs[0]\n    probs = softmax(logits)\n    preds = probs.argmax(axis=1).tolist()\n\n    return PredictResponse(\n        predictions=preds,\n        probabilities=probs.tolist(),\n    )\n\ndef softmax(x):\n    e = np.exp(x - x.max(axis=1, keepdims=True))\n    return e / e.sum(axis=1, keepdims=True)\n\n# Run: uvicorn ml_serving:app --workers 4\n# Test: curl -X POST http://localhost:8000/predict \\\n#   -H "Content-Type: application/json" \\\n#   -d \'{"features": [[0.1, 0.2, ...]]}\'',
          explanation: 'Embed ML model in FastAPI. Load at startup (lifespan), use ONNX Runtime for fast inference. Add /health for monitoring.'
        },
      ],
      exercises: [
        {
          prompt: 'Add a /predict/single endpoint that takes one feature vector (not a batch) and returns a single prediction.',
          starterCode: '@app.post("/predict/single")\nasync def predict_single(features: List[float]):\n    # your code\n    pass\n',
          hint: 'Reshape to (1, n), run inference, return first prediction.',
          solution: '@app.post("/predict/single")\nasync def predict_single(features: List[float]):\n    X = np.array([features], dtype=np.float32)  # (1, n_features)\n    outputs = session.run(None, {input_name: X})\n    probs = softmax(outputs[0])\n    pred = int(probs.argmax())\n    return {"prediction": pred, "confidence": float(probs[0][pred])}',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What is ONNX?',
          options: ['A deep learning framework', 'An interchange format for ML models', 'A model server', 'A dataset format'],
          correctIndex: 1,
          explanation: 'ONNX (Open Neural Network Exchange) is an interchange format. Export from PyTorch/TF/sklearn, run with ONNX Runtime in any language.'
        },
        {
          question: 'What is MLOps?',
          options: ['ML operations', 'DevOps for ML - versioning, monitoring, automation', 'A type of model', 'A framework'],
          correctIndex: 1,
          explanation: 'MLOps applies DevOps principles to ML: version data/models, track experiments, monitor in production, automate retraining.'
        },
        {
          question: 'What is data drift?',
          options: ['Model performance drops', 'Input data distribution changes over time', 'Labels change', 'Always bad'],
          correctIndex: 1,
          explanation: 'Data drift: input distribution changes (e.g., user demographics shift). Model trained on old data may not generalize. Monitor and retrain.'
        }
      ],
      keyTakeaways: [
        'ONNX is an interchange format - export from PyTorch/TF, run anywhere',
        'ONNX Runtime is 2-5x faster than PyTorch for inference',
        'Embed ML in FastAPI for low-latency serving, load model at startup',
        'MLflow/W&B track experiments, DVC versions data, MLflow versions models',
        'Monitor production: data drift, concept drift, prediction confidence',
        'Common patterns: embedded (simple), microservice (Triton), batch (offline)'
      ],
      resources: [
        { title: 'ONNX Runtime', url: 'https://onnxruntime.ai/', type: 'docs' },
        { title: 'MLflow', url: 'https://mlflow.org/', type: 'tool' },
        { title: 'MLOps Zoom (free course)', url: 'https://github.com/DataTalksClub/mlops-zoomcamp', type: 'article', isHiddenGem: true },
      ],
      miniProject: {
        title: 'Build an End-to-End ML Service',
        description: 'Train a model on real data, export to ONNX, serve with FastAPI, add monitoring and health checks.',
        requirements: [
          'Train a model on a real dataset (sklearn.datasets or Kaggle)',
          'Evaluate with cross-validation',
          'Export to ONNX format',
          'Serve with FastAPI (/predict, /health endpoints)',
          'Add input validation',
          'Log predictions for monitoring',
          'Write tests for the API'
        ],
        estTime: '6-8 hours',
        solutionCode: '# Full implementation would include:\n# 1. train.py - load data, train model, save as ONNX\n# 2. app.py - FastAPI serving with /predict and /health\n# 3. tests/ - TestClient tests\n# 4. requirements.txt - dependencies\n# 5. Dockerfile - containerize\n# 6. docker-compose.yml - run with monitoring\n\n# Key endpoints:\n# GET /health - returns model version and status\n# POST /predict - batch inference\n# POST /predict/single - single sample\n# GET /metrics - Prometheus metrics (request count, latency)',
        solutionLanguage: 'python'
      }
    },
  ]
};
