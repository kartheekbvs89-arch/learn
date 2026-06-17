import { Module } from '../types';

export const tensorflowModule: Module = {
  id: 'tensorflow',
  title: 'TensorFlow & Keras',
  icon: '⚙️',
  color: '#FF6F00',
  gradient: 'linear-gradient(135deg, #FF6F00 0%, #4285F4 100%)',
  description: 'Build, train, and deploy deep learning models with TensorFlow 2.x and Keras. From first neural net to production serving.',
  level: 'Advanced',
  learningPath: {
    title: 'Deep Learning Engineer Path (TensorFlow)',
    description: 'Master TensorFlow/Keras from basics to deployment.',
    phases: [
      {
        name: 'Foundation',
        description: 'Tensors, Keras API, first model',
        outcomes: [
          'Understand TensorFlow tensors and operations',
          'Build sequential models with Keras',
          'Train on MNIST/CIFAR',
        ],
      },
      {
        name: 'Intermediate',
        description: 'CNNs, RNNs, callbacks, checkpoints',
        outcomes: [
          'Build CNNs for image classification',
          'Use RNNs/LSTMs for sequences',
          'Save/load models, use callbacks',
        ],
      },
      {
        name: 'Advanced',
        description: 'Transfer learning, custom training, TF.data',
      outcomes: [
          'Apply transfer learning with pretrained models',
          'Write custom training loops with GradientTape',
          'Build efficient input pipelines with tf.data',
        ],
      },
      {
        name: 'Real-World',
        description: 'TF Serving, TFLite, TFX',
        outcomes: [
          'Serve models with TF Serving',
          'Deploy to mobile with TFLite',
          'Build ML pipelines with TFX',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Image Classification Mobile App',
    description: 'Train an image classifier, optimize with quantization, deploy to mobile with TFLite, serve via TF Serving.',
    features: [
      'Transfer learning with EfficientNet',
      'Data augmentation pipeline',
      'Quantization-aware training',
      'TFLite model for mobile',
      'TF Serving for cloud inference',
      'REST API wrapper',
    ],
    techStack: ['TensorFlow 2.x', 'Keras', 'tf.data', 'TF Serving', 'TFLite', 'FastAPI'],
    estTime: '8-10 hours',
    difficulty: 'Advanced',
  },
  lessons: [
    {
      id: 'tf-01',
      title: 'TensorFlow Basics & First Neural Network',
      subtitle: 'Tensors, Keras Sequential API, MNIST',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'TensorFlow is Google\'s open-source ML framework. TF 2.x uses Keras as its high-level API - simple, intuitive, production-ready. Like PyTorch, it uses eager execution by default (run Python, see results immediately).',
        'Key TF concepts: tf.Tensor (n-d array, like NumPy but GPU-enabled), tf.Variable (mutable tensor for weights), tf.GradientTape (automatic differentiation), tf.keras (high-level API).',
        'Keras Sequential model is the easiest way to build a neural network: stack layers with model.add(). Common layers: Dense (fully connected), Conv2D (convolutional), LSTM/GRU (recurrent), Dropout (regularization), BatchNormalization.',
        'Training workflow: 1) Build model, 2) Compile (optimizer, loss, metrics), 3) Fit (train), 4) Evaluate, 5) Predict. The model.fit() API handles the training loop automatically.',
      ],
      visualization: {
        title: 'Neural Network Architecture (MNIST)',
        type: 'architecture',
        diagram: `INPUT LAYER          HIDDEN LAYER 1      HIDDEN LAYER 2      OUTPUT\n(784 pixels)        (256 neurons)       (128 neurons)       (10 classes)\n\n┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐\n│ ● ● ● ●  │        │ ● ● ● ●  │        │ ● ● ● ●  │        │    0     │\n│ ● ● ● ●  │        │ ● ● ● ●  │        │ ● ● ● ●  │        │    1     │\n│ ● ● ● ●  │───────►│ ● ● ● ●  │───────►│ ● ● ● ●  │───────►│    2     │\n│ ● ● ● ●  │        │ ● ● ● ●  │        │ ● ● ● ●  │        │   ...    │\n│ ● ● ● ●  │ fully  │ ● ● ● ●  │ fully  │ ● ● ● ●  │ fully  │    9     │\n│ ● ● ● ●  │connected│  (256)   │connected│  (128)   │connected│  (10)    │\n│  (784)   │        └──────────┘        └──────────┘        └──────────┘\n└──────────┘         ReLU +              ReLU +              Softmax\n                      Dropout             Dropout\n\nLoss: categorical_crossentropy\nOptimizer: Adam\nMetric: accuracy`,
        legend: [
          'Each layer is fully connected (Dense)',
          'ReLU activation for hidden layers',
          'Softmax for output (probabilities sum to 1)',
          'Dropout prevents overfitting',
        ],
      },
      codeExamples: [
        {
          filename: 'first_model.py',
          language: 'python',
          code: '# pip install tensorflow\nimport tensorflow as tf\nfrom tensorflow import keras\nimport numpy as np\n\n# Load MNIST (handwritten digits 0-9)\n(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()\nprint(x_train.shape)  # (60000, 28, 28) - 60K images, 28x28 pixels\nprint(y_train.shape)  # (60000,)\n\n# Preprocess: normalize to [0, 1]\nx_train = x_train.astype("float32") / 255.0\nx_test = x_test.astype("float32") / 255.0\n\n# Build Sequential model\nmodel = keras.Sequential([\n    keras.layers.Flatten(input_shape=(28, 28)),  # 28x28 -> 784\n    keras.layers.Dense(256, activation="relu"),\n    keras.layers.Dropout(0.2),  # prevent overfitting\n    keras.layers.Dense(128, activation="relu"),\n    keras.layers.Dropout(0.2),\n    keras.layers.Dense(10, activation="softmax"),  # 10 classes\n])\n\n# Compile\nmodel.compile(\n    optimizer="adam",\n    loss="sparse_categorical_crossentropy",  # for integer labels\n    metrics=["accuracy"],\n)\n\nmodel.summary()\n# Total params: ~217K\n\n# Train\nhistory = model.fit(\n    x_train, y_train,\n    epochs=5,\n    batch_size=32,\n    validation_split=0.1,\n    verbose=1,\n)\n\n# Evaluate\ntest_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)\nprint(f"Test accuracy: {test_acc:.4f}")  # ~0.978\n\n# Predict\npredictions = model.predict(x_test[:5])\nprint(predictions[0].argmax())  # predicted digit\nprint(y_test[0])                # actual digit',
          explanation: 'Sequential model: stack layers. Flatten converts 2D image to 1D. Dense = fully connected. softmax for multi-class. sparse_categorical_crossentropy for integer labels.'
        },
      ],
      exercises: [
        {
          prompt: 'Build a model for CIFAR-10 (32x32 color images, 10 classes). Use Conv2D layers.',
          starterCode: 'import tensorflow as tf\nfrom tensorflow import keras\n\n(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()\n# normalize\n# build model with Conv2D layers\n# compile and train\n',
          hint: 'Use Conv2D(32, 3, activation="relu"), MaxPooling2D, Flatten, Dense.',
          solution: 'import tensorflow as tf\nfrom tensorflow import keras\n\n(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()\nx_train = x_train.astype("float32") / 255.0\nx_test = x_test.astype("float32") / 255.0\n\nmodel = keras.Sequential([\n    keras.layers.Conv2D(32, 3, activation="relu", input_shape=(32, 32, 3)),\n    keras.layers.MaxPooling2D(),\n    keras.layers.Conv2D(64, 3, activation="relu"),\n    keras.layers.MaxPooling2D(),\n    keras.layers.Flatten(),\n    keras.layers.Dense(128, activation="relu"),\n    keras.layers.Dense(10, activation="softmax"),\n])\n\nmodel.compile(optimizer="adam",\n              loss="sparse_categorical_crossentropy",\n              metrics=["accuracy"])\n\nmodel.fit(x_train, y_train, epochs=10, validation_split=0.1)\nmodel.evaluate(x_test, y_test)',
          solutionLanguage: 'python'
        },
      ],
      quiz: [
        {
          question: 'What does Flatten do?',
          options: ['Removes empty values', 'Converts multi-dimensional to 1D', 'Stops training early', 'Normalizes data'],
          correctIndex: 1,
          explanation: 'Flatten converts (28,28) to 784 - needed before Dense layers which expect 1D input.'
        },
        {
          question: 'When to use sparse_categorical_crossentropy vs categorical_crossentropy?',
          options: ['Always use sparse', 'sparse for integer labels, categorical for one-hot', 'Always use categorical', 'They are identical'],
          correctIndex: 1,
          explanation: 'sparse_categorical_crossentropy for integer labels (0,1,2...). categorical_crossentropy for one-hot ([1,0,0]).'
        }
      ],
      keyTakeaways: [
        'TF 2.x uses Keras as high-level API',
        'Sequential model: stack Dense/Conv2D/LSTM layers',
        'Compile: optimizer (adam), loss, metrics',
        'Train: model.fit(x, y, epochs, batch_size, validation_split)',
        'softmax for multi-class output, ReLU for hidden layers',
        'sparse_categorical_crossentropy for integer labels',
      ],
      resources: [
        { title: 'TensorFlow Documentation', url: 'https://www.tensorflow.org/', type: 'docs' },
        { title: 'Keras Guides', url: 'https://keras.io/guides/', type: 'article' },
      ]
    },

    {
      id: 'tf-02',
      title: 'CNNs for Image Classification',
      subtitle: 'Convolutional networks, pooling, data augmentation',
      duration: 70,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'Convolutional Neural Networks (CNNs) are the standard for image tasks. They use convolutional layers that learn spatial patterns (edges, textures, objects) by sliding filters across the image.',
        'Key CNN layers: Conv2D (learn filters), MaxPooling2D (downsample, reduce params), BatchNormalization (stabilize training), Dropout (regularization), Flatten + Dense (final classification).',
        'Data augmentation generates new training samples by transforming existing ones: rotation, flip, zoom, shift. Prevents overfitting, improves generalization. Use tf.keras.layers.RandomFlip/Rotation/Zoom (layers, work on GPU).',
        'Transfer learning: use a pretrained model (EfficientNet, ResNet, MobileNet) as feature extractor. Either freeze and add custom head, or fine-tune top layers. Much better results with less data.',
      ],
      codeExamples: [
        {
          filename: 'cnn_augmentation.py',
          language: 'python',
          code: 'import tensorflow as tf\nfrom tensorflow import keras\nfrom tensorflow.keras import layers\n\n# Load CIFAR-10\n(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()\nx_train = x_train.astype("float32") / 255.0\nx_test = x_test.astype("float32") / 255.0\n\n# Data augmentation as layers (runs on GPU)\naugmentation = keras.Sequential([\n    layers.RandomFlip("horizontal"),\n    layers.RandomRotation(0.1),\n    layers.RandomZoom(0.1),\n    layers.RandomTranslation(0.1, 0.1),\n])\n\n# Build CNN with augmentation\nmodel = keras.Sequential([\n    keras.Input(shape=(32, 32, 3)),\n    augmentation,  # apply augmentation during training only\n\n    # Conv block 1\n    layers.Conv2D(32, 3, padding="same", activation="relu"),\n    layers.BatchNormalization(),\n    layers.Conv2D(32, 3, padding="same", activation="relu"),\n    layers.MaxPooling2D(),\n    layers.Dropout(0.25),\n\n    # Conv block 2\n    layers.Conv2D(64, 3, padding="same", activation="relu"),\n    layers.BatchNormalization(),\n    layers.Conv2D(64, 3, padding="same", activation="relu"),\n    layers.MaxPooling2D(),\n    layers.Dropout(0.25),\n\n    # Conv block 3\n    layers.Conv2D(128, 3, padding="same", activation="relu"),\n    layers.BatchNormalization(),\n    layers.Conv2D(128, 3, padding="same", activation="relu"),\n    layers.MaxPooling2D(),\n    layers.Dropout(0.25),\n\n    # Classifier\n    layers.GlobalAveragePooling2D(),  # better than Flatten + Dense\n    layers.Dense(256, activation="relu"),\n    layers.Dropout(0.5),\n    layers.Dense(10, activation="softmax"),\n])\n\nmodel.compile(\n    optimizer=keras.optimizers.Adam(1e-3),\n    loss="sparse_categorical_crossentropy",\n    metrics=["accuracy"],\n)\n\n# Callbacks\ncallbacks = [\n    keras.callbacks.ModelCheckpoint(\n        "best_model.h5", save_best_only=True, monitor="val_accuracy"\n    ),\n    keras.callbacks.EarlyStopping(\n        monitor="val_accuracy", patience=5, restore_best_weights=True\n    ),\n    keras.callbacks.ReduceLROnPlateau(\n        monitor="val_loss", factor=0.5, patience=3, min_lr=1e-6\n    ),\n]\n\n# Train\nhistory = model.fit(\n    x_train, y_train,\n    epochs=50,\n    batch_size=64,\n    validation_split=0.1,\n    callbacks=callbacks,\n)\n\n# Evaluate\nmodel.evaluate(x_test, y_test)  # ~85-90% accuracy',
          explanation: 'CNN: Conv2D blocks (extract features), MaxPooling (downsample), BatchNorm (stabilize), Dropout (regularize). Augmentation as layers runs on GPU. GlobalAveragePooling is better than Flatten.'
        },
        {
          filename: 'transfer_learning.py',
          language: 'python',
          code: 'import tensorflow as tf\nfrom tensorflow import keras\nfrom tensorflow.keras import layers\nimport tensorflow_datasets as tfds\n\n# Load cats_vs_dogs dataset\n(train_ds, val_ds), info = tfds.load(\n    "cats_vs_dogs",\n    split=["train[:80%]", "train[80%:]"],\n    as_supervised=True,\n    with_info=True,\n)\n\n# Preprocess\nIMG_SIZE = 160\ndef preprocess(image, label):\n    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE))\n    image = tf.cast(image, tf.float32) / 127.5 - 1.0  # [-1, 1] for MobileNet\n    return image, label\n\ntrain_ds = train_ds.map(preprocess).batch(32).prefetch(tf.data.AUTOTUNE)\nval_ds = val_ds.map(preprocess).batch(32).prefetch(tf.data.AUTOTUNE)\n\n# Use pretrained MobileNetV2 as feature extractor\nbase_model = keras.applications.MobileNetV2(\n    input_shape=(IMG_SIZE, IMG_SIZE, 3),\n    include_top=False,  # remove classification head\n    weights="imagenet",\n)\nbase_model.trainable = False  # freeze\n\n# Build model with new head\nmodel = keras.Sequential([\n    base_model,\n    layers.GlobalAveragePooling2D(),\n    layers.Dropout(0.2),\n    layers.Dense(1, activation="sigmoid"),  # binary: cat or dog\n])\n\nmodel.compile(\n    optimizer=keras.optimizers.Adam(1e-3),\n    loss="binary_crossentropy",\n    metrics=["accuracy"],\n)\n\n# Train (just the new head)\nmodel.fit(train_ds, validation_data=val_ds, epochs=5)\n\n# Fine-tune: unfreeze top layers of base model\nbase_model.trainable = True\nfor layer in base_model.layers[:-20]:  # freeze all but last 20\n    layer.trainable = False\n\n# Recompile with lower LR for fine-tuning\nmodel.compile(\n    optimizer=keras.optimizers.Adam(1e-5),  # 10x lower!\n    loss="binary_crossentropy",\n    metrics=["accuracy"],\n)\n\nmodel.fit(train_ds, validation_data=val_ds, epochs=5)\n# ~98% accuracy with transfer learning!',
          explanation: 'Transfer learning: pretrained model as feature extractor, add custom head. Train head first, then fine-tune top layers with very low LR. Beats training from scratch.'
        },
      ],
      keyTakeaways: [
        'CNNs: Conv2D (learn filters), MaxPooling (downsample), BatchNorm (stabilize)',
        'Use blocks of Conv2D + BatchNorm + MaxPool + Dropout',
        'Data augmentation as layers (RandomFlip/Rotation/Zoom) runs on GPU',
        'GlobalAveragePooling2D > Flatten + Dense (fewer params, better results)',
        'Transfer learning: pretrained base + custom head, fine-tune top with low LR',
        'Callbacks: ModelCheckpoint, EarlyStopping, ReduceLROnPlateau',
      ],
      resources: [
        { title: 'TensorFlow CNN Tutorial', url: 'https://www.tensorflow.org/tutorials/images/cnn', type: 'docs' },
        { title: 'Transfer Learning Guide', url: 'https://www.tensorflow.org/tutorials/images/transfer_learning', type: 'docs' },
      ]
    },

    {
      id: 'tf-03',
      title: 'Production TensorFlow: Serving & TFLite',
      subtitle: 'Deploy models to server, mobile, and edge',
      duration: 60,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'TensorFlow Serving is Google\'s production server for TF models. Load SavedModel, expose via gRPC/REST, handles batching, versioning, multiple models. Perfect for cloud deployment.',
        'TFLite converts TF models to a lightweight format for mobile/embedded. Quantization (float32 -> int8) reduces size 4x and speeds up inference 3x with minimal accuracy loss. Perfect for mobile/edge.',
        'TF.data API builds efficient input pipelines: load from disk, decode, augment, batch, prefetch. prefetch(AUTOTUNE) overlaps data loading with training - free speedup.',
        'TFX (TensorFlow Extended) is an end-to-end ML platform: data validation, transformation, training, evaluation, serving. Used at Google scale. Components: ExampleGen, StatisticsGen, Trainer, Evaluator, Pusher.',
      ],
      codeExamples: [
        {
          filename: 'tf_data_pipeline.py',
          language: 'python',
          code: 'import tensorflow as tf\nfrom tensorflow import keras\nimport pathlib\n\n# Efficient input pipeline with tf.data\n# Assume images in dirs: data/cats/*.jpg, data/dogs/*.jpg\ndata_dir = pathlib.Path("data")\nbatch_size = 32\nimg_size = (160, 160)\n\n# Load from directory (auto-labeled by subdir)\ntrain_ds = keras.utils.image_dataset_from_directory(\n    data_dir,\n    validation_split=0.2,\n    subset="training",\n    seed=42,\n    image_size=img_size,\n    batch_size=batch_size,\n)\nval_ds = keras.utils.image_dataset_from_directory(\n    data_dir,\n    validation_split=0.2,\n    subset="validation",\n    seed=42,\n    image_size=img_size,\n    batch_size=batch_size,\n)\n\nclass_names = train_ds.class_names\n\n# Optimize pipeline\nAUTOTUNE = tf.data.AUTOTUNE\n\n# Data augmentation\naugment = keras.Sequential([\n    keras.layers.RandomFlip("horizontal"),\n    keras.layers.RandomRotation(0.1),\n])\n\n# Map, cache, prefetch - the magic combo\ntrain_ds = (\n    train_ds\n    .map(lambda x, y: (augment(x, training=True), y),\n         num_parallel_calls=AUTOTUNE)\n    .cache()  # cache after first epoch\n    .shuffle(1000)\n    .prefetch(AUTOTUNE)  # overlap data loading with training\n)\n\nval_ds = val_ds.cache().prefetch(AUTOTUNE)\n\n# Train (pipeline runs on CPU/GPU while model trains on GPU)\nmodel = keras.Sequential([...])  # your model\nmodel.fit(train_ds, validation_data=val_ds, epochs=10)',
          explanation: 'tf.data pipeline: image_dataset_from_directory, .map() for transforms, .cache() to avoid re-decoding, .prefetch() to overlap loading with training. Massive speedup.'
        },
        {
          filename: 'save_serve.py',
          language: 'python',
          code: 'import tensorflow as tf\nfrom tensorflow import keras\n\n# Save model in SavedModel format (for TF Serving)\nmodel.save("my_model")  # creates my_model/ directory\n\n# OR save .keras format (newer, recommended)\nmodel.save("my_model.keras")\n\n# Load\nmodel = keras.models.load_model("my_model.keras")\n\n# === TensorFlow Serving ===\n# Pull Docker image\n# docker pull tensorflow/serving\n\n# Run server with your model\n# docker run -p 8501:8501 --name tf-serving \\\n#   -v $(pwd)/my_model:/models/my_model \\\n#   -e MODEL_NAME=my_model \\\n#   tensorflow/serving\n\n# Predict via REST API\nimport requests\nimport json\nimport numpy as np\n\n# Prepare input\nx = np.random.rand(1, 28, 28).tolist()  # one image\npayload = json.dumps({"instances": x})\n\nresponse = requests.post(\n    "http://localhost:8501/v1/models/my_model:predict",\n    data=payload,\n    headers={"content-type": "application/json"},\n)\npredictions = response.json()["predictions"]\nprint(predictions[0].index(max(predictions[0])))  # predicted class\n\n# === TFLite for Mobile ===\n# Convert to TFLite\nconverter = tf.lite.TFLiteConverter.from_keras_model(model)\n\n# Optional: quantization (4x smaller, 3x faster)\nconverter.optimizations = [tf.lite.Optimize.DEFAULT]\n# For int8 quantization, need representative dataset:\n# def representative_data():\n#     for x in train_ds.take(100):\n#         yield [x[0]]\n# converter.representative_dataset = representative_data\n# converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]\n\n tflite_model = converter.convert()\n\n# Save\nwith open("model.tflite", "wb") as f:\n    f.write(tflite_model)\n\n# Size comparison:\n# original: 12 MB\n# tflite: 3 MB\n# int8: 800 KB',
          explanation: 'SavedModel format for TF Serving (Docker container, REST/gRPC API). TFLite for mobile - quantization reduces size 4x. Use representative_dataset for int8.'
        },
      ],
      lab: {
        title: 'Deploy a Model to Mobile and Server',
        objective: 'Train, convert, and serve a model end-to-end',
        estTime: '3-4 hours',
        difficulty: 'Advanced',
        setup: [
          'pip install tensorflow tensorflow-serving-api requests',
          'Docker installed',
        ],
        steps: [
          {
            title: 'Train a digit classifier',
            instruction: 'Train MNIST model from tf-01 lesson',
            code: '# (use the MNIST model from tf-01)\nmodel.save("mnist_model")  # SavedModel format',
            codeLanguage: 'python',
          },
          {
            title: 'Deploy with TF Serving (Docker)',
            instruction: 'Run TF Serving in Docker',
            code: '# Save model in SavedModel format\nimport tensorflow as tf\nmodel = tf.keras.models.load_model("mnist_model.keras")\nmodel.save("mnist_savedmodel/1/")  # version 1\n\n# Run TF Serving\ndocker run -d --name serving \\\n  -p 8501:8501 \\\n  -v $(pwd)/mnist_savedmodel:/models/mnist \\\n  -e MODEL_NAME=mnist \\\n  tensorflow/serving\n\n# Wait for it to start\nsleep 10\ncurl http://localhost:8501/v1/models/mnist',
            codeLanguage: 'bash',
            expectedOutput: '{ "model_version_status": [{ "version": "1", "state": "AVAILABLE", "status": { "error_code": "OK" } }]}',
          },
          {
            title: 'Call the model via REST',
            instruction: 'Send prediction request',
            code: 'import requests\nimport json\nimport numpy as np\n\n# Load test image\n(_, _), (x_test, _) = tf.keras.datasets.mnist.load_data()\nimage = x_test[0:1].astype("float32") / 255.0\n\n# Predict\npayload = json.dumps({"instances": image.tolist()})\nresponse = requests.post(\n    "http://localhost:8501/v1/models/mnist:predict",\n    data=payload,\n)\npred = np.array(response.json()["predictions"][0]).argmax()\nprint(f"Predicted: {pred}")  # 7',
            codeLanguage: 'python',
          },
          {
            title: 'Convert to TFLite for mobile',
            instruction: 'Quantize and convert',
            code: 'import tensorflow as tf\n\nconverter = tf.lite.TFLiteConverter.from_saved_model("mnist_savedmodel/1/")\nconverter.optimizations = [tf.lite.Optimize.DEFAULT]\ntflite_model = converter.convert()\n\nwith open("mnist.tflite", "wb") as f:\n    f.write(tflite_model)\n\nimport os\nprint(f"Original: {os.path.getsize(\'mnist_savedmodel/1/saved_model.pb\')/1024:.0f} KB")\nprint(f"TFLite:   {os.path.getsize(\'mnist.tflite\')/1024:.0f} KB")',
            codeLanguage: 'python',
            expectedOutput: 'Original: 1000 KB\nTFLite:   250 KB  # 4x smaller',
          },
        ],
        verification: 'TF Serving responds to REST calls. TFLite model is 4x smaller. Both produce same predictions.',
        cleanup: 'docker stop serving && docker rm serving',
      },
      keyTakeaways: [
        'TF Serving: Docker container with REST/gRPC API, handles versioning',
        'TFLite: lightweight format for mobile, quantization reduces size 4x',
        'tf.data: .cache() + .prefetch(AUTOTUNE) = free speedup',
        'int8 quantization needs representative_dataset for accuracy',
        'TFX: end-to-end ML platform (ExampleGen, Trainer, Evaluator, Pusher)',
        'Save as SavedModel for Serving, .keras for development',
      ],
      resources: [
        { title: 'TF Serving', url: 'https://www.tensorflow.org/tfx/guide/serving', type: 'docs' },
        { title: 'TFLite Converter', url: 'https://www.tensorflow.org/lite/convert', type: 'docs' },
        { title: 'tf.data Performance', url: 'https://www.tensorflow.org/guide/data_performance', type: 'article' },
      ],
      miniProject: {
        title: 'Image Classification Mobile App',
        description: 'End-to-end: train, quantize, deploy to mobile + cloud',
        requirements: [
          'Train image classifier with transfer learning',
          'Apply data augmentation',
          'Convert to TFLite with int8 quantization',
          'Deploy to TF Serving (Docker)',
          'Build FastAPI wrapper for cloud inference',
          'Compare latency: original vs quantized',
        ],
        estTime: '8-10 hours',
        solutionCode: '# See lab steps above for patterns.\n# Key files:\n# - train.py: train with transfer learning\n# - convert.py: convert to TFLite with quantization\n# - serve.py: deploy to TF Serving\n# - api.py: FastAPI wrapper\n# - benchmark.py: compare latencies',
        solutionLanguage: 'python'
      }
    },
  ]
};
