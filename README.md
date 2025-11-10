Kubernetes Course Starter Project (Windows)

Overview
- This repo provides a small Node.js app you can containerize and deploy to Kubernetes while following the YouTube course: https://www.youtube.com/watch?v=d6WC5n9G_sM
- It includes:
  - Simple Express app with `/`, `/healthz`, `/readyz` endpoints
  - Dockerfile and `.dockerignore`
  - Kubernetes manifests: `Deployment`, `Service`, `ConfigMap`, `Secret`
  - A `kustomization.yaml` to apply all resources together

Submission without committing screenshots
- If you prefer not to push screenshots to the repo, use the Word-compatible template at `docs/Submission_Template.xml`.
- Download it, open with Microsoft Word, paste your screenshots under each heading, then Save As `.docx` locally (do not commit).
- The CI-based validation steps and artifact details are documented in `docs/COURSE_WORK.md`.

Prerequisites (choose one local cluster option)
- Option A: Docker Desktop with Kubernetes enabled
  - Install Docker Desktop for Windows
  - Enable Kubernetes in Docker Desktop settings
- Option B: Minikube
  - Install Minikube: https://minikube.sigs.k8s.io/docs/start/
  - Install kubectl: https://kubernetes.io/docs/tasks/tools/

Project Structure
- `src/server.js` – Express server using env vars `APP_MESSAGE` and `SECRET_TOKEN`
- `Dockerfile` – Builds a production image exposing port `3000`
- `k8s/deployment.yaml` – Deployment with 2 replicas, liveness/readiness probes
- `k8s/service.yaml` – ClusterIP service mapping `80 -> 3000`
- `k8s/configmap.yaml` – Provides `APP_MESSAGE`
- `k8s/secret-example.yaml` – Demo secret with `SECRET_TOKEN` (base64 encoded)
- `k8s/kustomization.yaml` – Apply all manifests at once

Run Locally (without Kubernetes)
- Ensure Node.js is installed (https://nodejs.org/)
- In a terminal from the project root:
  - `npm install`
  - `npm start`
  - Open `http://localhost:3000/` and `http://localhost:3000/healthz`

Build the Docker Image
- From the project root:
  - `docker build -t k8s-course-app:0.1.0 .`

Using Minikube
1) Start cluster
   - `minikube start`
2) Load image into Minikube’s Docker
   - Option A (recommended): `minikube image load k8s-course-app:0.1.0`
   - Option B: `minikube docker-env` then build inside Minikube’s Docker (PowerShell):
     - `& minikube -p minikube docker-env --shell powershell | Invoke-Expression`
     - `docker build -t k8s-course-app:0.1.0 .`
3) Apply manifests (kustomize)
   - `kubectl apply -k k8s/`
4) Verify
   - `kubectl get pods`
   - `kubectl describe deployment k8s-course-app`
5) Access the app
   - `minikube service k8s-course-app --url`  (opens a browser or shows URL)

Using Docker Desktop Kubernetes
1) Ensure Kubernetes is enabled in Docker Desktop
2) Make image available to the cluster
   - Push to a registry or use `kind` if you prefer; with Docker Desktop, a simple approach is to tag and push to Docker Hub:
     - `docker tag k8s-course-app:0.1.0 <your-dockerhub-username>/k8s-course-app:0.1.0`
     - `docker push <your-dockerhub-username>/k8s-course-app:0.1.0`
   - Update `k8s/deployment.yaml` image to your pushed image
3) Apply manifests
   - `kubectl apply -k k8s/`
4) Port-forward to access
   - `kubectl port-forward svc/k8s-course-app 8080:80`
   - Visit `http://localhost:8080/`

Environment Variables
- ConfigMap: `APP_MESSAGE` controls the message shown on `/`
- Secret: `SECRET_TOKEN` toggles secret status in `/` response
  - The demo secret encodes `secrettoken`. Replace with your own:
    - Create base64: `echo -n "mysecret" | base64`
    - Edit `k8s/secret-example.yaml` to set the new base64 value
    - `kubectl apply -k k8s/` (or `kubectl apply -f k8s/secret-example.yaml`)

Probes
- `livenessProbe` calls `/healthz` to check if container is alive
- `readinessProbe` calls `/readyz` to ensure pod is ready before receiving traffic

Common Commands
- Inspect resources: `kubectl get all`
- Pod logs: `kubectl logs -l app=k8s-course-app`
- Delete resources: `kubectl delete -k k8s/`

Next Steps (course-aligned ideas)
- Scale replicas: `kubectl scale deployment k8s-course-app --replicas=3`
- Rolling updates: change `image` tag then `kubectl apply -k k8s/`
- Add Ingress (Minikube: enable addon `minikube addons enable ingress` and create an ingress rule)
- Add resource requests/limits and explore scheduling
- Add HPA (install metrics-server, then apply an HPA targeting CPU/load)

Troubleshooting
- If pods stuck in `ImagePullBackOff`: ensure image is accessible by the cluster
- If `CrashLoopBackOff`: check logs: `kubectl logs <pod-name>`; verify env vars
- For Minikube URLs not opening: use `minikube service k8s-course-app --url` and paste URL in browser