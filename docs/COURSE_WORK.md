# Kubernetes Course Work Submission

This document records the hands-on practice done during the course and links to screenshots stored in `docs/screenshots/`.

## Checklist
- [ ] Built Docker image: `k8s-course-app:0.1.0`
- [ ] Started Minikube cluster
- [ ] Loaded image into Minikube
- [ ] Applied manifests via `kubectl apply -k k8s/`
- [ ] Verified pods are running
- [ ] Exposed service and accessed app URL
- [ ] Scaled deployment and observed rolling update

## Commands Used
Record the commands run and brief notes:

```
docker build -t k8s-course-app:0.1.0 .
minikube start
minikube image load k8s-course-app:0.1.0
kubectl apply -k k8s/
kubectl get pods
minikube service k8s-course-app --url
kubectl scale deployment k8s-course-app --replicas=3
```

## Screenshots
Place the following screenshot files under `docs/screenshots/` and check them off:

- [ ] `01_minikube_start.png` – Minikube started successfully
- [ ] `02_image_loaded.png` – Result of `minikube image load`
- [ ] `03_apply_manifests.png` – Output of `kubectl apply -k k8s/`
- [ ] `04_pods_running.png` – Output of `kubectl get pods`
- [ ] `05_service_url.png` – Output of `minikube service k8s-course-app --url`
- [ ] `06_app_response.png` – Browser JSON from root endpoint
- [ ] `07_scale_replicas.png` – Output of scale command
- [ ] `08_rollout_status.png` – Output of `kubectl rollout status deployment/k8s-course-app`

## Notes
- Config and secret are in `k8s/configmap.yaml` and `k8s/secret-example.yaml`.
- Probes: liveness `/healthz`, readiness `/readyz`.
- Service is ClusterIP; use Minikube `service --url` or `port-forward`.