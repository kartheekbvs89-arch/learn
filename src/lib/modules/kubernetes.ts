import { Module } from '../types';

export const kubernetesModule: Module = {
  id: 'kubernetes',
  title: 'Kubernetes & Orchestration',
  icon: '☸️',
  color: '#326CE5',
  gradient: 'linear-gradient(135deg, #326CE5 0%, #00CED1 100%)',
  description: 'Master Kubernetes from architecture to production. Deploy, scale, and manage containerized applications at scale.',
  level: 'Advanced',
  learningPath: {
    title: 'Kubernetes Operator Path',
    description: 'From container orchestration basics to production cluster management.',
    phases: [
      {
        name: 'Foundation',
        description: 'K8s architecture, objects, kubectl basics',
        outcomes: [
          'Understand K8s architecture (control plane, nodes)',
          'Deploy Pods, Deployments, Services',
          'Use kubectl to manage resources',
          'Understand namespaces and labels',
        ],
      },
      {
        name: 'Intermediate',
        description: 'ConfigMaps, Secrets, volumes, scaling',
        outcomes: [
          'Manage configuration with ConfigMaps and Secrets',
          'Use persistent volumes for stateful apps',
          'Scale applications with HPA',
          'Implement health checks and probes',
        ],
      },
      {
        name: 'Advanced',
        description: 'Helm, operators, networking, security',
        outcomes: [
          'Package apps with Helm charts',
          'Set up ingress and network policies',
          'Configure RBAC and security contexts',
          'Debug production issues',
        ],
      },
      {
        name: 'Real-World',
        description: 'Production deployment, monitoring, GitOps',
        outcomes: [
          'Deploy a microservices app to K8s',
          'Set up monitoring with Prometheus/Grafana',
          'Implement CI/CD with ArgoCD',
          'Handle upgrades and rollbacks',
        ],
      },
    ],
  },
  capstoneProject: {
    title: 'Deploy Microservices to Production K8s',
    description: 'Deploy a 3-service application (API, worker, frontend) to K8s with Helm, ingress, monitoring, and CI/CD.',
    architecture: `┌──────────────────────────────────────────────────────┐
│                    Internet                           │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  Ingress Controller (Nginx)                          │
│  • TLS termination                                   │
│  • Rate limiting                                     │
└──────────────────────┬───────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ API Service  │ │ Web Service  │ │ WebSocket    │
│ (3 replicas) │ │ (2 replicas) │ │ Service      │
│ FastAPI      │ │ Next.js      │ │ (1 replica)  │
└──────┬───────┘ └──────────────┘ └──────┬───────┘
       │                                  │
       ▼                                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ PostgreSQL   │ │ Redis        │ │ Celery       │
│ (StatefulSet)│ │ (StatefulSet)│ │ Workers      │
└──────────────┘ └──────────────┘ └──────────────┘`,
    features: [
      '3 microservices with independent scaling',
      'PostgreSQL with persistent volumes',
      'Redis for caching and queues',
      'Nginx ingress with TLS',
      'Horizontal Pod Autoscaler',
      'Health checks and readiness probes',
      'Prometheus monitoring',
      'ArgoCD GitOps deployment',
    ],
    techStack: [
      'Kubernetes 1.28+',
      'Helm 3',
      'Nginx Ingress',
      'cert-manager (Let\'s Encrypt)',
      'Prometheus + Grafana',
      'ArgoCD',
    ],
    estTime: '8-12 hours',
    difficulty: 'Advanced',
  },
  lessons: [
    {
      id: 'k8s-01',
      title: 'What is Kubernetes? Architecture & Concepts',
      subtitle: 'Control plane, nodes, pods, services - the mental model',
      duration: 50,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'Kubernetes (K8s) is an open-source container orchestration platform. It automates deployment, scaling, and management of containerized applications. Originally developed by Google (based on their internal Borg system), now maintained by the CNCF.',
        'K8s solves: 1) Scaling (run 100 instances of your app, not 1), 2) Self-healing (restart failed containers, replace dead nodes), 3) Rolling updates (deploy without downtime), 4) Service discovery (apps find each other), 5) Load balancing (distribute traffic).',
        'Architecture: Control Plane (master) manages the cluster. Nodes (workers) run your containers. The control plane has: API server (entry point), etcd (key-value store), scheduler (assigns pods to nodes), controller manager (maintains desired state). Nodes run: kubelet (agent), kube-proxy (networking), container runtime (containerd/Docker).',
        'Key objects: Pod (smallest unit, 1+ containers), Deployment (manages replicas of pods), Service (network endpoint for pods), ConfigMap/Secret (configuration), Ingress (HTTP routing), Volume (storage).',
      ],
      visualization: {
        title: 'Kubernetes Cluster Architecture',
        type: 'architecture',
        diagram: `┌─────────────────────────────────────────────────────────┐
│                   CONTROL PLANE                         │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ API Server  │  │  Scheduler  │  │ Controller  │     │
│  │ (entry)     │  │ (assigns    │  │ Manager     │     │
│  │             │  │  pods)      │  │ (desired    │     │
│  └──────┬──────┘  └─────────────┘  │  state)     │     │
│         │                           └─────────────┘     │
│         │                                               │
│  ┌──────▼──────┐                                        │
│  │   etcd      │  (key-value store,                    │
│  │             │   source of truth)                    │
│  └─────────────┘                                        │
└─────────────────────────┬───────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   NODE 1    │  │   NODE 2    │  │   NODE 3    │
│             │  │             │  │             │
│ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │
│ │ kubelet │ │  │ │ kubelet │ │  │ │ kubelet │ │
│ ├─────────┤ │  │ ├─────────┤ │  │ ├─────────┤ │
│ │kube-proxy│ │  │ │kube-proxy│ │  │ │kube-proxy│ │
│ ├─────────┤ │  │ ├─────────┤ │  │ ├─────────┤ │
│ │containerd│ │  │ │containerd│ │  │ │containerd│ │
│ │  ┌───┐  │ │  │ │  ┌───┐  │ │  │ │  ┌───┐  │ │
│ │  │Pod│  │ │  │ │  │Pod│  │ │  │ │  │Pod│  │ │
│ │  └───┘  │ │  │ │  └───┘  │ │  │ │  └───┘  │ │
│ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │
└─────────────┘  └─────────────┘  └─────────────┘`,
        legend: [
          'Control Plane: brain of the cluster, makes global decisions',
          'Nodes: workers that run your containers in Pods',
          'etcd: the source of truth - stores all cluster state',
          'kubelet: ensures pods are running on its node',
          'Pod: smallest deployable unit, contains 1+ containers',
        ],
      },
      codeExamples: [
        {
          filename: 'kubectl_basics.sh',
          language: 'bash',
          code: '# Install kubectl: https://kubernetes.io/docs/tasks/tools/\n# Or use kind/minikube for local cluster:\n# kind create cluster --name mycluster\n# minikube start\n\n# Cluster info\nkubectl cluster-info\nkubectl get nodes\nkubectl get nodes -o wide\n\n# Namespaces (logical grouping)\nkubectl get namespaces\nkubectl create namespace myapp\nkubectl config set-context --current --namespace=myapp\n\n# Pod operations\nkubectl run nginx --image=nginx\nkubectl get pods\nkubectl get pods -o wide\nkubectl describe pod nginx\nkubectl logs nginx\nkubectl exec -it nginx -- bash\nkubectl delete pod nginx\n\n# Apply YAML manifests\nkubectl apply -f deployment.yaml\nkubectl apply -f service.yaml\n\n# Get everything\nkubectl get all\nkubectl get all -n myapp\n\n# Port forward (local access to a service)\nkubectl port-forward svc/myapp 8080:80\n# Now localhost:8080 -> service',
          explanation: 'kubectl is the CLI to interact with K8s. Use `get` to list, `describe` for details, `apply` to create/update from YAML, `logs` to view output.'
        },
      ],
      exercises: [
        {
          prompt: 'Run an nginx pod, port-forward to localhost:8080, verify it serves the default page.',
          starterCode: '# Your kubectl commands\n',
          hint: 'kubectl run, kubectl port-forward, then curl localhost:8080.',
          solution: 'kubectl run nginx --image=nginx\nkubectl port-forward pod/nginx 8080:80\n# In another terminal:\ncurl http://localhost:8080\n# Should see "Welcome to nginx!"',
          solutionLanguage: 'bash'
        },
      ],
      quiz: [
        {
          question: 'What is the smallest deployable unit in K8s?',
          options: ['Container', 'Pod', 'Deployment', 'Node'],
          correctIndex: 1,
          explanation: 'A Pod is the smallest unit. It contains 1+ containers that share network and storage.'
        },
        {
          question: 'What does etcd store?',
          options: ['Container images', 'Cluster state (source of truth)', 'Application logs', 'User data'],
          correctIndex: 1,
          explanation: 'etcd is a key-value store that holds all cluster state. It IS the source of truth.'
        },
        {
          question: 'What does the scheduler do?',
          options: ['Runs containers', 'Assigns pods to nodes', 'Monitors health', 'Manages networking'],
          correctIndex: 1,
          explanation: 'The scheduler watches for new pods and decides which node should run them based on resources, constraints.'
        }
      ],
      keyTakeaways: [
        'K8s orchestrates containers: scaling, self-healing, rolling updates',
        'Control Plane (master) manages, Nodes (workers) run containers',
        'Pod = smallest unit, contains 1+ containers',
        'etcd is the source of truth for cluster state',
        'kubectl is the CLI - get, describe, apply, logs, exec',
      ],
      resources: [
        { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/', type: 'docs' },
        { title: 'Kubernetes Tutorial (Kubernetes Basics)', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', type: 'article' },
        { title: 'kind - local K8s for testing', url: 'https://kind.sigs.k8s.io/', type: 'tool', isHiddenGem: true },
      ],
      setup: {
        title: 'Set up a local K8s cluster',
        os: 'all',
        steps: [
          {
            description: 'Install kubectl',
            command: '# Linux\ncurl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"\nsudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl\n\n# macOS\nbrew install kubectl\n\n# Windows\nwinget install Kubernetes.kubectl',
          },
          {
            description: 'Install kind (Kubernetes in Docker)',
            command: '# Linux/macOS\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\n\n# OR use go: go install sigs.k8s.io/kind@latest',
          },
          {
            description: 'Create a cluster',
            command: 'kind create cluster --name mycluster\nkubectl cluster-info\nkubectl get nodes',
            expectedOutput: 'Kubernetes control plane is running at https://127.0.0.1:54321\nNAME                       STATUS   ROLES           AGE   VERSION\nmycluster-control-plane   Ready    control-plane   10s   v1.28.0',
          },
        ],
        verification: 'kubectl get nodes should show 1 node Ready.',
      },
    },

    {
      id: 'k8s-02',
      title: 'Pods, Deployments & Services',
      subtitle: 'The core workload objects',
      duration: 60,
      difficulty: 'Beginner',
      phase: 'Foundation',
      content: [
        'A Pod is the smallest deployable unit in K8s. It contains one or more containers that share network and storage. You rarely create pods directly - instead use a Deployment which manages replicas of pods.',
        'A Deployment ensures N replicas of your pod are running. If a pod dies, the Deployment creates a new one. To update, change the image and K8s rolls out new pods gradually while terminating old ones.',
        'A Service provides a stable network endpoint for a set of pods. Pods have dynamic IPs - services solve this with a stable IP + DNS name. Types: ClusterIP (internal only), NodePort (expose on node port), LoadBalancer (cloud LB), Headless (direct pod IPs).',
        'Labels and selectors connect everything. Pods have labels (app=api, tier=backend). Services select pods by labels. This loose coupling lets you swap pods without changing the service.',
      ],
      visualization: {
        title: 'Deployment → Pods → Service Relationship',
        type: 'architecture',
        diagram: `┌──────────────────────────────────────────────────┐
│  Deployment (desired state: 3 replicas)          │
│  • Ensures 3 pods always running                 │
│  • Handles rolling updates                       │
│  • Self-healing (replaces dead pods)             │
└────────────────────┬─────────────────────────────┘
                     │ creates/manages
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │  Pod 1  │  │  Pod 2  │  │  Pod 3  │
   │ labels: │  │ labels: │  │ labels: │
   │ app=api │  │ app=api │  │ app=api │
   │10.0.1.5 │  │10.0.1.6 │  │10.0.1.7 │
   └─────────┘  └─────────┘  └─────────┘
        ▲            ▲            ▲
        │            │            │
        └────────────┼────────────┘
                     │ selects by label (app=api)
                     ▼
┌──────────────────────────────────────────────────┐
│  Service (stable IP + DNS)                       │
│  • ClusterIP: 10.96.0.10 (internal)             │
│  • DNS: api-service.myapp.svc.cluster.local     │
│  • Load balances across matching pods           │
└──────────────────────────────────────────────────┘

Apps talk to Service DNS name, never to pods directly.
Pod IPs change; Service IP is stable.`,
        legend: [
          'Deployment = desired state (3 replicas) + update strategy',
          'Pods = actual running containers with dynamic IPs',
          'Service = stable entry point that load-balances to pods',
          'Labels (app=api) connect Services to Pods',
        ],
      },
      codeExamples: [
        {
          filename: 'deployment.yaml',
          language: 'yaml',
          code: '# deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api-deployment\n  labels:\n    app: api\nspec:\n  replicas: 3  # desired number of pods\n  selector:\n    matchLabels:\n      app: api  # which pods this deployment manages\n  template:  # pod template\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: api\n        image: myapp:1.0.0\n        ports:\n        - containerPort: 8000\n        env:\n        - name: DATABASE_URL\n          value: "postgresql://db:5432/myapp"\n        resources:\n          requests:  # minimum resources\n            cpu: "100m"     # 0.1 CPU\n            memory: "128Mi"\n          limits:     # maximum resources\n            cpu: "500m"\n            memory: "512Mi"\n        livenessProbe:  # is it alive?\n          httpGet:\n            path: /health\n            port: 8000\n          initialDelaySeconds: 10\n          periodSeconds: 5\n        readinessProbe:  # is it ready to serve?\n          httpGet:\n            path: /ready\n            port: 8000\n          initialDelaySeconds: 5\n          periodSeconds: 3\n---\n# service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: api-service\nspec:\n  type: ClusterIP  # internal only\n  selector:\n    app: api  # routes to pods with this label\n  ports:\n  - port: 80        # service port\n    targetPort: 8000  # container port\n    protocol: TCP',
          explanation: 'Deployment manages replicas. Service provides stable endpoint. Labels connect them. Probes ensure health. Resources prevent starvation.'
        },
        {
          filename: 'kubectl_deploy.sh',
          language: 'bash',
          code: '# Apply the manifests\nkubectl apply -f deployment.yaml\nkubectl apply -f service.yaml\n\n# Check status\nkubectl get deployments\nkubectl get pods\nkubectl get services\n\n# Watch pods come up\nkubectl get pods -w\n\n# Scale up\nkubectl scale deployment api-deployment --replicas=5\n\n# Update image (rolling update)\nkubectl set image deployment/api-deployment api=myapp:2.0.0\n\n# Check rollout status\nkubectl rollout status deployment/api-deployment\n\n# Rollback if something went wrong\nkubectl rollout undo deployment/api-deployment\n\n# View rollout history\nkubectl rollout history deployment/api-deployment\n\n# Port forward to test\nkubectl port-forward svc/api-service 8080:80\n# Now localhost:8080 -> service -> pod\n\n# View pod logs\nkubectl logs -l app=api --tail=20\nkubectl logs -f deployment/api-deployment  # follow\n\n# Execute into a pod\nkubectl exec -it <pod-name> -- bash\n\n# Delete everything\nkubectl delete -f deployment.yaml\nkubectl delete -f service.yaml',
          explanation: 'kubectl apply creates/updates. scale changes replicas. set image triggers rolling update. rollout undo rolls back. port-forward for local testing.'
        },
      ],
      lab: {
        title: 'Deploy a FastAPI App to K8s',
        objective: 'Deploy a FastAPI app with 3 replicas and access it via Service',
        estTime: '45 minutes',
        difficulty: 'Beginner',
        setup: [
          'Have a local K8s cluster (kind or minikube)',
          'kubectl installed and configured',
          'A FastAPI Docker image (use a public one for simplicity)',
        ],
        steps: [
          {
            title: 'Create deployment.yaml',
            instruction: 'Define a Deployment with 3 replicas of a FastAPI app',
            code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fastapi-demo\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: fastapi-demo\n  template:\n    metadata:\n      labels:\n        app: fastapi-demo\n    spec:\n      containers:\n      - name: api\n        image: tiangolo/uvicorn-gunicorn-fastapi:python3.11\n        ports:\n        - containerPort: 80\n        env:\n        - name: MODULE_NAME\n          value: "main"\n        livenessProbe:\n          httpGet:\n            path: /docs\n            port: 80\n          periodSeconds: 10\n        readinessProbe:\n          httpGet:\n            path: /docs\n            port: 80\n          periodSeconds: 5',
            codeLanguage: 'yaml',
          },
          {
            title: 'Create service.yaml',
            instruction: 'Define a Service to expose the deployment',
            code: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: fastapi-demo\nspec:\n  type: NodePort  # accessible on node port\n  selector:\n    app: fastapi-demo\n  ports:\n  - port: 80\n    targetPort: 80\n    nodePort: 30080',
            codeLanguage: 'yaml',
          },
          {
            title: 'Deploy and verify',
            instruction: 'Apply manifests and check everything is running',
            code: 'kubectl apply -f deployment.yaml -f service.yaml\nkubectl get pods -w  # wait for Running\nkubectl get svc fastapi-demo\n\n# Access via port-forward\nkubectl port-forward svc/fastapi-demo 8080:80\n# Open http://localhost:8080/docs in browser',
            codeLanguage: 'bash',
            expectedOutput: 'NAME                              READY   STATUS    RESTARTS   AGE\nfastapi-demo-xxx-aaa              1/1     Running   0          30s\nfastapi-demo-xxx-bbb              1/1     Running   0          30s\nfastapi-demo-xxx-ccc              1/1     Running   0          30s',
          },
          {
            title: 'Test self-healing',
            instruction: 'Delete a pod and watch K8s recreate it',
            code: 'kubectl delete pod -l app=fastapi-demo --grace-period=0 --force\nkubectl get pods -w  # watch new pod appear',
            codeLanguage: 'bash',
            explanation: 'K8s immediately creates a new pod to maintain the desired 3 replicas.',
          },
          {
            title: 'Scale and update',
            instruction: 'Scale to 5 replicas and update the image',
            code: 'kubectl scale deployment fastapi-demo --replicas=5\nkubectl get pods  # 5 pods now\n\n# Rolling update\nkubectl set image deployment/fastapi-demo api=tiangolo/uvicorn-gunicorn-fastapi:python3.12\nkubectl rollout status deployment/fastapi-demo\n\n# Rollback\nkubectl rollout undo deployment/fastapi-demo',
            codeLanguage: 'bash',
          },
        ],
        verification: '3+ pods Running, port-forward works, scaling and updates succeed.',
        cleanup: 'kubectl delete -f deployment.yaml -f service.yaml',
      },
      exercises: [
        {
          prompt: 'Write a Deployment YAML for an nginx app with 2 replicas, then a Service to expose it on port 80.',
          starterCode: '# your YAML\n',
          hint: 'Use apps/v1, kind: Deployment, 2 replicas, selector app=web. Service with type ClusterIP.',
          solution: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:alpine\n        ports:\n        - containerPort: 80\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: web\nspec:\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 80',
          solutionLanguage: 'yaml'
        },
      ],
      quiz: [
        {
          question: 'What happens if a pod in a Deployment crashes?',
          options: ['Nothing, it stays dead', 'K8s automatically creates a new pod', 'The Deployment is deleted', 'You must manually restart it'],
          correctIndex: 1,
          explanation: 'Deployments ensure desired replica count. If a pod dies, K8s creates a new one automatically.'
        },
        {
          question: 'Why use a Service instead of connecting to pods directly?',
          options: ['Services are faster', 'Pod IPs are dynamic, Service IP is stable', 'Required by K8s', 'Services handle auth'],
          correctIndex: 1,
          explanation: 'Pods come and go (dynamic IPs). Services provide a stable IP and DNS name that load-balances to matching pods.'
        },
        {
          question: 'How do Services know which pods to route to?',
          options: ['By IP address', 'By labels and selectors', 'By name', 'Randomly'],
          correctIndex: 1,
          explanation: 'Services use selectors (app=api) to find pods with matching labels. This loose coupling enables scaling and updates.'
        }
      ],
      keyTakeaways: [
        'Pod = smallest unit, contains 1+ containers',
        'Deployment manages replicas + rolling updates + self-healing',
        'Service provides stable network endpoint (DNS name) for pods',
        'Labels + selectors connect Services to Pods',
        'Use kubectl apply/scale/set image/rollout for management',
        'Probes (liveness, readiness) ensure healthy pods',
      ],
      resources: [
        { title: 'Kubernetes Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', type: 'docs' },
        { title: 'Kubernetes Services', url: 'https://kubernetes.io/docs/concepts/services-networking/service/', type: 'docs' },
      ]
    },

    {
      id: 'k8s-03',
      title: 'ConfigMaps, Secrets & Volumes',
      subtitle: 'Configuration, sensitive data, and persistent storage',
      duration: 55,
      difficulty: 'Intermediate',
      phase: 'Intermediate',
      content: [
        'ConfigMaps store non-sensitive configuration as key-value pairs. Inject as environment variables or files. This separates config from code - same image works in dev/staging/prod with different ConfigMaps.',
        'Secrets store sensitive data (passwords, tokens, certs). Base64-encoded (NOT encrypted by default - enable encryption at rest). Mount as files or env vars. Use external secret managers (Vault, AWS Secrets Manager) for production.',
        'Volumes solve the problem of pod ephemeral storage. When a pod dies, its data is lost. Volumes persist data across pod restarts. Types: emptyDir (temporary, shared between containers), hostPath (node directory), persistentVolumeClaim (PVC - networked storage).',
        'StatefulSets are like Deployments but for stateful apps (databases). They provide: stable pod names (db-0, db-1), stable storage (each pod gets its own PVC), ordered startup/shutdown. Use for PostgreSQL, MySQL, Kafka, etc.',
      ],
      codeExamples: [
        {
          filename: 'config.yaml',
          language: 'yaml',
          code: '# ConfigMap - non-sensitive config\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: app-config\ndata:\n  DATABASE_HOST: "postgres.default.svc.cluster.local"\n  DATABASE_PORT: "5432"\n  LOG_LEVEL: "info"\n  config.yaml: |\n    server:\n      host: 0.0.0.0\n      port: 8000\n    features:\n      new_ui: true\n---\n# Secret - sensitive data (base64 encoded)\napiVersion: v1\nkind: Secret\nmetadata:\n  name: app-secrets\ntype: Opaque\ndata:\n  DATABASE_PASSWORD: cGFzc3dvcmQxMjM=  # echo -n "password123" | base64\n  API_KEY: bXktc2VjcmV0LWtleQ==\n# OR use stringData for plaintext (auto-encoded):\n# stringData:\n#   DATABASE_PASSWORD: "password123"\n---\n# Pod using both\napiVersion: v1\nkind: Pod\nmetadata:\n  name: app\nspec:\n  containers:\n  - name: app\n    image: myapp:1.0\n    env:\n    # From ConfigMap\n    - name: DATABASE_HOST\n      valueFrom:\n        configMapKeyRef:\n          name: app-config\n          key: DATABASE_HOST\n    # From Secret\n    - name: DATABASE_PASSWORD\n      valueFrom:\n        secretKeyRef:\n          name: app-secrets\n          key: DATABASE_PASSWORD\n    # Import entire ConfigMap as env vars\n    envFrom:\n    - configMapRef:\n        name: app-config\n    # Mount ConfigMap as file\n    volumeMounts:\n    - name: config-volume\n      mountPath: /etc/config\n  volumes:\n  - name: config-volume\n    configMap:\n      name: app-config',
          explanation: 'ConfigMaps for non-sensitive config, Secrets for sensitive. Inject as env vars or mounted files. envFrom imports all keys at once.'
        },
        {
          filename: 'storage.yaml',
          language: 'yaml',
          code: '# PersistentVolume - cluster-level storage resource\napiVersion: v1\nkind: PersistentVolume\nmetadata:\n  name: pv-1\nspec:\n  capacity:\n    storage: 10Gi\n  accessModes:\n  - ReadWriteOnce  # one node at a time\n  persistentVolumeReclaimPolicy: Retain  # keep data after PVC deleted\n  hostPath:  # for local cluster only!\n    path: /mnt/data\n---\n# PersistentVolumeClaim - user request for storage\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: pvc-1\nspec:\n  accessModes:\n  - ReadWriteOnce\n  resources:\n    requests:\n      storage: 5Gi\n---\n# Pod using the PVC\napiVersion: v1\nkind: Pod\nmetadata:\n  name: db\nspec:\n  containers:\n  - name: postgres\n    image: postgres:16\n    env:\n    - name: POSTGRES_PASSWORD\n      value: "secret"\n    volumeMounts:\n    - name: data\n      mountPath: /var/lib/postgresql/data\n  volumes:\n  - name: data\n    persistentVolumeClaim:\n      claimName: pvc-1\n---\n# StatefulSet - for stateful apps (databases)\napiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: db\nspec:\n  serviceName: db\n  replicas: 3\n  selector:\n    matchLabels:\n      app: db\n  template:\n    metadata:\n      labels:\n        app: db\n    spec:\n      containers:\n      - name: postgres\n        image: postgres:16\n        volumeMounts:\n        - name: data\n          mountPath: /var/lib/postgresql/data\n  volumeClaimTemplates:  # auto-create PVC per pod\n  - metadata:\n      name: data\n    spec:\n      accessModes: [ReadWriteOnce]\n      resources:\n        requests:\n          storage: 10Gi',
          explanation: 'PVs are cluster storage, PVCs claim them. StatefulSets use volumeClaimTemplates to give each pod its own PVC. Pods get stable names (db-0, db-1, db-2).'
        },
      ],
      exercises: [
        {
          prompt: 'Create a Secret with an API_KEY and a Deployment that uses it as an env var.',
          starterCode: '# your YAML\n',
          hint: 'echo -n "your-key" | base64 to encode. Use secretKeyRef in env.',
          solution: 'apiVersion: v1\nkind: Secret\nmetadata:\n  name: api-keys\ntype: Opaque\nstringData:\n  API_KEY: "my-secret-key-123"\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: api\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: api\n  template:\n    metadata:\n      labels:\n        app: api\n    spec:\n      containers:\n      - name: api\n        image: myapp:1.0\n        env:\n        - name: API_KEY\n          valueFrom:\n            secretKeyRef:\n              name: api-keys\n              key: API_KEY',
          solutionLanguage: 'yaml'
        },
      ],
      quiz: [
        {
          question: 'Are K8s Secrets encrypted by default?',
          options: ['Yes, always', 'No, only base64-encoded - enable encryption at rest', 'Yes, with AES', 'Only in cloud K8s'],
          correctIndex: 1,
          explanation: 'Secrets are only base64-encoded by default. Enable EncryptionConfiguration for encryption at rest. Use external secret managers for production.'
        },
        {
          question: 'When should you use a StatefulSet instead of a Deployment?',
          options: ['Always', 'For stateless apps', 'For stateful apps like databases', 'Never'],
          correctIndex: 2,
          explanation: 'StatefulSets give stable pod names, stable storage (PVC per pod), and ordered startup. Perfect for databases.'
        },
        {
          question: 'What is a PVC?',
          options: ['Persistent Volume Claim - request for storage', 'Pod Volume Configuration', 'Persistent Virtual Container', 'Private Volume Cluster'],
          correctIndex: 0,
          explanation: 'PVC = PersistentVolumeClaim. It is a user request for storage that binds to a PersistentVolume.'
        }
      ],
      keyTakeaways: [
        'ConfigMaps for non-sensitive config, Secrets for sensitive data',
        'Inject config as env vars or mounted files',
        'Use stringData for plaintext secrets (auto-encoded)',
        'PersistentVolumes + PVCs for durable storage',
        'StatefulSets for databases (stable names, storage, ordering)',
        'Enable encryption at rest for Secrets in production',
      ],
      resources: [
        { title: 'Kubernetes ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/', type: 'docs' },
        { title: 'Kubernetes Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/', type: 'docs' },
        { title: 'External Secrets Operator', url: 'https://external-secrets.io/', type: 'tool', isHiddenGem: true },
      ]
    },

    {
      id: 'k8s-04',
      title: 'Helm - Package Manager for K8s',
      subtitle: 'Charts, values, templating, releases',
      duration: 50,
      difficulty: 'Advanced',
      phase: 'Advanced',
      content: [
        'Helm is the package manager for Kubernetes. A Helm Chart is a collection of templates that generate K8s manifests. Helm lets you: 1) Package an app with all its K8s resources, 2) Configure via values.yaml, 3) Version and share charts, 4) Upgrade/rollback releases.',
        'Charts structure: Chart.yaml (metadata), values.yaml (defaults), templates/ (K8s manifests with Go template syntax), charts/ (dependencies). Use `helm create` to scaffold, `helm install` to deploy, `helm upgrade` to update.',
        'Templating uses Go templates with Sprig functions. Variables: {{ .Values.image }}, {{ .Release.Name }}. Control structures: {{ if }}, {{ range }}, {{ with }}. Use {{ include }} for partials. Helper functions in _helpers.tpl.',
        'Artifact Hub has thousands of public charts (databases, monitoring, etc.). For production, use a private chart repository (Harbor, ChartMuseum) or OCI registry. Umbrella charts combine multiple subcharts.',
      ],
      codeExamples: [
        {
          filename: 'chart_structure.txt',
          language: 'text',
          code: 'mychart/\n├── Chart.yaml          # Chart metadata\n├── values.yaml         # Default config values\n├── values-prod.yaml    # Production overrides\n├── charts/             # Dependencies (subcharts)\n└── templates/\n    ├── _helpers.tpl    # Template helpers\n    ├── deployment.yaml\n    ├── service.yaml\n    ├── ingress.yaml\n    ├── configmap.yaml\n    └── NOTES.txt       # Post-install notes\n\n# Chart.yaml\napiVersion: v2\nname: myapp\ndescription: My application\nversion: 0.1.0          # Chart version\nappVersion: "1.0.0"     # App version\ndependencies:\n  - name: postgresql\n    version: 12.x.x\n    repository: https://charts.bitnami.com/bitnami\n    condition: postgresql.enabled',
        },
        {
          filename: 'helm_templates.yaml',
          language: 'yaml',
          code: '# values.yaml\nimage:\n  repository: myapp\n  tag: "1.0.0"\n  pullPolicy: IfNotPresent\n\nreplicaCount: 3\n\nservice:\n  type: ClusterIP\n  port: 80\n\nresources:\n  requests:\n    cpu: 100m\n    memory: 128Mi\n  limits:\n    cpu: 500m\n    memory: 512Mi\n\ningress:\n  enabled: true\n  host: myapp.example.com\n\n# templates/deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ include "myapp.fullname" . }}\n  labels:\n    {{- include "myapp.labels" . | nindent 4 }}\nspec:\n  replicas: {{ .Values.replicaCount }}\n  selector:\n    matchLabels:\n      {{- include "myapp.selectorLabels" . | nindent 6 }}\n  template:\n    metadata:\n      labels:\n        {{- include "myapp.selectorLabels" . | nindent 8 }}\n    spec:\n      containers:\n      - name: {{ .Chart.Name }}\n        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"\n        imagePullPolicy: {{ .Values.image.pullPolicy }}\n        ports:\n        - containerPort: 8000\n        resources:\n          {{- toYaml .Values.resources | nindent 10 }}\n        {{- with .Values.env }}\n        env:\n          {{- toYaml . | nindent 10 }}\n        {{- end }}\n\n# templates/_helpers.tpl\n{{- define "myapp.fullname" -}}\n{{- if .Values.fullnameOverride }}\n{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}\n{{- else }}\n{{- $name := default .Chart.Name .Values.nameOverride }}\n{{- if contains $name .Release.Name }}\n{{- .Release.Name | trunc 63 | trimSuffix "-" }}\n{{- else }}\n{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}\n{{- end }}\n{{- end }}\n{{- end }}\n\n{{- define "myapp.labels" -}}\nhelm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version }}\n{{ include "myapp.selectorLabels" . }}\n{{- end }}\n\n{{- define "myapp.selectorLabels" -}}\napp.kubernetes.io/name: {{ .Chart.Name }}\napp.kubernetes.io/instance: {{ .Release.Name }}\n{{- end }}',
          explanation: 'Go templates with {{ .Values.x }} for config, {{ include }} for helpers, {{- nindent N }} for indentation. _helpers.tpl defines reusable helpers.'
        },
        {
          filename: 'helm_commands.sh',
          language: 'bash',
          code: '# Create a new chart\nhelm create mychart\n\n# Lint (validate)\nhelm lint mychart\n\n# Template (render without deploying)\nhelm template mychart mychart/\nhelm template mychart mychart/ -f values-prod.yaml\n\n# Install\nhelm install myapp mychart/\nhelm install myapp mychart/ -f values-prod.yaml\nhelm install myapp mychart/ --set replicaCount=5\n\n# List releases\nhelm list\nhelm list --all-namespaces\n\n# Upgrade\nhelm upgrade myapp mychart/ -f values-prod.yaml\nhelm upgrade myapp mychart/ --set image.tag=2.0.0\n\n# Rollback\nhelm rollback myapp 1  # rollback to revision 1\nhelm history myapp\n\n# Uninstall\nhelm uninstall myapp\n\n# Add a chart repository\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\nhelm search repo postgresql\nhelm install mydb bitnami/postgresql\n\n# Package and push\nhelm package mychart/\nhelm push mychart-0.1.0.tgz oci://registry.example.com/charts',
          explanation: 'Helm workflow: create → lint → template (preview) → install → upgrade → rollback → uninstall. Use --set for one-off values, -f for value files.'
        },
      ],
      lab: {
        title: 'Create a Helm Chart for a FastAPI App',
        objective: 'Package a FastAPI app as a reusable Helm chart',
        estTime: '60 minutes',
        difficulty: 'Intermediate',
        setup: [
          'Install Helm: https://helm.sh/docs/intro/install/',
          'Have a K8s cluster running (kind/minikube)',
          'kubectl configured',
        ],
        steps: [
          {
            title: 'Create the chart scaffold',
            instruction: 'Use helm create to generate the structure',
            code: 'helm create fastapi-chart\ncd fastapi-chart\nls -la\n# Chart.yaml  values.yaml  templates/  charts/',
            codeLanguage: 'bash',
          },
          {
            title: 'Customize values.yaml',
            instruction: 'Set your app-specific values',
            code: '# values.yaml\nreplicaCount: 3\n\nimage:\n  repository: tiangolo/uvicorn-gunicorn-fastapi\n  tag: python3.11\n  pullPolicy: IfNotPresent\n\nservice:\n  type: ClusterIP\n  port: 80\n\ningress:\n  enabled: false\n\nresources:\n  requests:\n    cpu: 100m\n    memory: 128Mi\n  limits:\n    cpu: 500m\n    memory: 256Mi\n\nautoscaling:\n  enabled: true\n  minReplicas: 2\n  maxReplicas: 10\n  targetCPUUtilizationPercentage: 80',
            codeLanguage: 'yaml',
          },
          {
            title: 'Verify the templates render correctly',
            instruction: 'Use helm template to preview without deploying',
            code: 'helm template myapi .\n# Check the output - should see Deployment, Service, HPA\n\n# Lint\nhelm lint .',
            codeLanguage: 'bash',
            expectedOutput: '==> Linting .\n[INFO] Chart.yaml: icon is recommended\n\n1 chart(s) linted, 0 chart(s) failed',
          },
          {
            title: 'Install and test',
            instruction: 'Install the chart and verify',
            code: 'helm install myapi .\nkubectl get pods -l app.kubernetes.io/instance=myapi\n\n# Port forward\nkubectl port-forward svc/myapi 8080:80\n# Open http://localhost:8080/docs\n\n# Check release status\nhelm status myapi\nhelm list',
            codeLanguage: 'bash',
          },
          {
            title: 'Upgrade with new values',
            instruction: 'Create a production values file and upgrade',
            code: '# values-prod.yaml\nreplicaCount: 5\nresources:\n  requests:\n    cpu: 250m\n    memory: 256Mi\n  limits:\n    cpu: 1000m\n    memory: 512Mi\n\nhelm upgrade myapi . -f values-prod.yaml\nkubectl get pods  # should scale to 5\n\n# Rollback if needed\nhelm rollback myapi 1',
            codeLanguage: 'bash',
          },
        ],
        verification: 'helm list shows myapi deployed. kubectl get pods shows 3-5 replicas. port-forward works.',
        cleanup: 'helm uninstall myapi',
      },
      keyTakeaways: [
        'Helm packages K8s apps as charts (reusable, versioned)',
        'Charts: Chart.yaml (metadata), values.yaml (config), templates/ (manifests)',
        'Go templates: {{ .Values.x }}, {{ include }}, {{- nindent N }}',
        'Workflow: create → lint → template → install → upgrade → rollback',
        'Use helm repo add for public charts (Bitnami has many)',
        'Package with helm package, push to OCI registry or chart repo',
      ],
      resources: [
        { title: 'Helm Documentation', url: 'https://helm.sh/docs/', type: 'docs' },
        { title: 'Artifact Hub (chart repository)', url: 'https://artifacthub.io/', type: 'tool' },
        { title: 'Helm Best Practices', url: 'https://helm.sh/docs/chart_best_practices/', type: 'article' },
      ]
    },

    {
      id: 'k8s-05',
      title: 'Production K8s: Ingress, Monitoring & GitOps',
      subtitle: 'Production-grade deployments with ArgoCD, Prometheus',
      duration: 70,
      difficulty: 'Advanced',
      phase: 'Real-World',
      content: [
        'Production K8s needs more than just Deployments. Ingress controllers (nginx, traefik) handle HTTP routing, TLS termination, and rate limiting. cert-manager auto-issues Let\'s Encrypt certificates. Together: HTTPS for all your apps.',
        'Monitoring: Prometheus scrapes metrics from your apps, Grafana visualizes them. The kube-prometheus-stack Helm chart installs everything. Add ServiceMonitor resources to tell Prometheus what to scrape. Alert rules notify you of issues.',
        'GitOps with ArgoCD: your Git repo is the source of truth. ArgoCD watches the repo and syncs to K8s automatically. To deploy, push to Git - ArgoCD handles the rest. Rollback = revert Git commit. Audit trail for free.',
        'Production checklist: 1) Resource limits on everything, 2) Health probes (liveness + readiness), 3) Multiple replicas (no single point of failure), 4) PodDisruptionBudgets for voluntary disruptions, 5) HPA for auto-scaling, 6) NetworkPolicies for security, 7) Monitoring + alerting, 8) Backup strategy, 9) Disaster recovery plan.',
      ],
      codeExamples: [
        {
          filename: 'ingress.yaml',
          language: 'yaml',
          code: '# Install nginx ingress controller\n# helm install ingress-nginx ingress-nginx/ingress-nginx \\\n#   --namespace ingress-nginx --create-namespace\n\n# Install cert-manager for Let\'s Encrypt\n# helm install cert-manager jetstack/cert-manager \\\n#   --namespace cert-manager --create-namespace \\\n#   --set installCRDs=true\n\n# ClusterIssuer for Let\'s Encrypt\napiVersion: cert-manager.io/v1\nkind: ClusterIssuer\nmetadata:\n  name: letsencrypt-prod\nspec:\n  acme:\n    server: https://acme-v02.api.letsencrypt.org/directory\n    email: you@example.com\n    privateKeySecretRef:\n      name: letsencrypt-prod\n    solvers:\n    - http01:\n        ingress:\n          class: nginx\n---\n# Ingress - HTTP routing with TLS\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: myapp-ingress\n  annotations:\n    cert-manager.io/cluster-issuer: letsencrypt-prod\n    nginx.ingress.kubernetes.io/rate-limit: "100"\n    nginx.ingress.kubernetes.io/rate-limit-window: "1m"\nspec:\n  tls:\n  - hosts:\n    - api.example.com\n    secretName: api-tls\n  rules:\n  - host: api.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: api-service\n            port:\n              number: 80',
          explanation: 'Ingress routes HTTP traffic. cert-manager + ClusterIssuer auto-issue TLS certs. Annotations configure nginx (rate limiting, etc.).'
        },
        {
          filename: 'monitoring.yaml',
          language: 'yaml',
          code: '# Install kube-prometheus-stack (Prometheus + Grafana + AlertManager)\n# helm install monitoring prometheus-community/kube-prometheus-stack \\\n#   --namespace monitoring --create-namespace \\\n#   --set grafana.adminPassword=admin\n\n# ServiceMonitor - tells Prometheus what to scrape\napiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: api-monitor\n  labels:\n    release: monitoring  # must match Prometheus selector\nspec:\n  selector:\n    matchLabels:\n      app: api  # scrape services with this label\n  endpoints:\n  - port: http  # scrape this port\n    interval: 30s\n    path: /metrics  # metrics endpoint\n---\n# PrometheusRule - alert rules\napiVersion: monitoring.coreos.com/v1\nkind: PrometheusRule\nmetadata:\n  name: api-alerts\nspec:\n  groups:\n  - name: api\n    rules:\n    - alert: HighErrorRate\n      expr: |\n        rate(http_requests_total{job="api",status=~"5.."}[5m])\n        / rate(http_requests_total{job="api"}[5m]) > 0.05\n      for: 5m\n      labels:\n        severity: critical\n      annotations:\n        summary: "High error rate on API"\n        description: "Error rate is {{ $value | humanizePercentage }}"\n\n# In your FastAPI app, expose /metrics:\n# pip install prometheus-fastapi-instrumentator\n# from prometheus_fastapi_instrumentator import Instrumentator\n# Instrumentator().instrument(app).expose(app)',
          explanation: 'ServiceMonitor tells Prometheus to scrape your app. PrometheusRule defines alert conditions. Grafana (included) visualizes metrics.'
        },
        {
          filename: 'argocd.yaml',
          language: 'yaml',
          code: '# Install ArgoCD\n# helm install argocd argo/argo-cd \\\n#   --namespace argocd --create-namespace\n\n# ArgoCD Application - declares what to deploy\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: myapp\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/me/myapp-deploy\n    targetRevision: HEAD\n    path: manifests/  # K8s manifests in this dir\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: myapp\n  syncPolicy:\n    automated:  # auto-sync on Git changes\n      prune: true  # delete removed resources\n      selfHeal: true  # undo manual changes\n    syncOptions:\n    - CreateNamespace=true\n\n# Workflow:\n# 1. Developer pushes code to app repo\n# 2. CI builds image, updates manifest in deploy repo\n# 3. ArgoCD detects change, syncs to K8s\n# 4. ArgoCD reports sync status\n\n# ArgoCD CLI\n# argocd login localhost:8080\n# argocd app get myapp\n# argocd app sync myapp\n# argocd app history myapp\n# argocd app rollback myapp <revision>',
          explanation: 'ArgoCD watches your Git repo and syncs to K8s automatically. Push to Git = deploy. Revert Git = rollback. Full audit trail.'
        },
      ],
      lab: {
        title: 'Set Up Production K8s Stack',
        objective: 'Install ingress, cert-manager, monitoring, and ArgoCD',
        estTime: '2-3 hours',
        difficulty: 'Advanced',
        setup: [
          'K8s cluster (kind or cloud)',
          'kubectl + helm installed',
          'A domain name pointing to your cluster (or use nip.io for testing)',
        ],
        steps: [
          {
            title: 'Install nginx ingress controller',
            instruction: 'Add the repo and install',
            code: 'helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx\nhelm repo update\nhelm install ingress-nginx ingress-nginx/ingress-nginx \\\n  --namespace ingress-nginx --create-namespace\n\n# Wait for it to be ready\nkubectl wait --namespace ingress-nginx \\\n  --for=condition=ready pod \\\n  --selector=app.kubernetes.io/component=controller \\\n  --timeout=120s',
            codeLanguage: 'bash',
          },
          {
            title: 'Install cert-manager',
            instruction: 'Install cert-manager for TLS certificates',
            code: 'helm repo add jetstack https://charts.jetstack.io\nhelm repo update\nhelm install cert-manager jetstack/cert-manager \\\n  --namespace cert-manager --create-namespace \\\n  --set installCRDs=true\n\n# Verify\nkubectl get pods -n cert-manager',
            codeLanguage: 'bash',
          },
          {
            title: 'Install monitoring stack',
            instruction: 'Install Prometheus + Grafana',
            code: 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts\nhelm install monitoring prometheus-community/kube-prometheus-stack \\\n  --namespace monitoring --create-namespace \\\n  --set grafana.adminPassword=admin\n\n# Get Grafana password\nkubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 --decode\n\n# Port forward to access\nkubectl port-forward -n monitoring svc/monitoring-grafana 3000:80\n# Open http://localhost:3000 (admin/admin)',
            codeLanguage: 'bash',
          },
          {
            title: 'Install ArgoCD',
            instruction: 'Install ArgoCD for GitOps',
            code: 'helm repo add argo https://argoproj.github.io/argo-helm\nhelm install argocd argo/argo-cd \\\n  --namespace argocd --create-namespace\n\n# Get admin password\nkubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d\n\n# Port forward\nkubectl port-forward svc/argocd-server -n argocd 8080:443\n# Open https://localhost:8080 (admin / <password>)',
            codeLanguage: 'bash',
          },
          {
            title: 'Deploy an app via GitOps',
            instruction: 'Connect ArgoCD to a Git repo and watch it deploy',
            code: '# Create an Application (via UI or CLI)\nargocd app create myapp \\\n  --repo https://github.com/argoproj/argocd-example-apps \\\n  --path guestbook \\\n  --dest-server https://kubernetes.default.svc \\\n  --dest-namespace default \\\n  --sync-policy automated\n\n# Watch it deploy\nargocd app get myapp\nkubectl get pods  # guestbook pods appear',
            codeLanguage: 'bash',
            explanation: 'ArgoCD pulled manifests from Git and deployed them. Any push to that repo path will now auto-deploy.',
          },
        ],
        verification: 'All 4 components running. Grafana accessible. ArgoCD shows app synced. Ingress handles traffic.',
      },
      exercises: [
        {
          prompt: 'Write an Ingress resource that routes api.example.com to svc/api and app.example.com to svc/web, with TLS for both.',
          starterCode: '# your Ingress YAML\n',
          hint: 'Two rules with different hosts, two TLS entries.',
          solution: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: multi-app\n  annotations:\n    cert-manager.io/cluster-issuer: letsencrypt-prod\nspec:\n  tls:\n  - hosts: [api.example.com]\n    secretName: api-tls\n  - hosts: [app.example.com]\n    secretName: app-tls\n  rules:\n  - host: api.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: api\n            port:\n              number: 80\n  - host: app.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: web\n            port:\n              number: 80',
          solutionLanguage: 'yaml'
        },
      ],
      quiz: [
        {
          question: 'What does cert-manager do?',
          options: ['Manages SSL certificates (auto-issue, renew)', 'Manages container images', 'Manages config', 'Manages secrets encryption'],
          correctIndex: 0,
          explanation: 'cert-manager auto-issues and renews TLS certificates (e.g., from Let\'s Encrypt). No more manual cert management!'
        },
        {
          question: 'What is GitOps?',
          options: ['Using Git for version control', 'Git is the source of truth, deployments sync from Git', 'CI with Git', 'GitHub-only deployments'],
          correctIndex: 1,
          explanation: 'GitOps: Git repo is the source of truth. Tools like ArgoCD/Flux sync K8s state to match Git. To deploy, push to Git.'
        },
        {
          question: 'What does a ServiceMonitor do?',
          options: ['Monitors services for errors', 'Tells Prometheus what endpoints to scrape', 'Restarts failing services', 'Balances load'],
          correctIndex: 1,
          explanation: 'ServiceMonitor tells Prometheus which services to scrape for metrics, on which port, and how often.'
        }
      ],
      keyTakeaways: [
        'Ingress controllers handle HTTP routing, TLS, rate limiting',
        'cert-manager auto-issues and renews Let\'s Encrypt certificates',
        'Prometheus + Grafana for metrics, Loki for logs',
        'ArgoCD/Flux for GitOps - Git is source of truth',
        'Production checklist: limits, probes, PDB, HPA, monitoring, backups',
        'ServiceMonitor tells Prometheus what to scrape',
      ],
      resources: [
        { title: 'ArgoCD Documentation', url: 'https://argo-cd.readthedocs.io/', type: 'docs' },
        { title: 'Prometheus Operator', url: 'https://prometheus-operator.dev/', type: 'docs' },
        { title: 'Kubernetes Production Checklist', url: 'https://learnk8s.io/production-best-practices', type: 'article', isHiddenGem: true },
      ],
      miniProject: {
        title: 'Deploy Microservices to Production K8s',
        description: 'Deploy a 3-service app (API, worker, frontend) with Helm, ingress, monitoring, and ArgoCD.',
        requirements: [
          'Helm chart for each service',
          'PostgreSQL StatefulSet with PVC',
          'Redis StatefulSet',
          'Nginx ingress with TLS',
          'Prometheus monitoring with ServiceMonitors',
          'HPA on API and worker',
          'ArgoCD application for GitOps',
          'Production resource limits and probes',
        ],
        estTime: '8-12 hours',
        solutionCode: '# Structure:\n# deploy/\n# ├── charts/\n# │   ├── api/\n# │   ├── worker/\n# │   └── web/\n# ├── infrastructure/\n# │   ├── postgresql.yaml\n# │   ├── redis.yaml\n# │   └── ingress.yaml\n# └── argocd/\n#     └── app.yaml\n#\n# See kube-prometheus-stack and argo-cd Helm charts for setup.\n# Use Bitnami postgresql and redis charts as dependencies.',
        solutionLanguage: 'yaml'
      }
    },
  ]
};
