# Kubernetes Course Work Submission

This document records the hands-on practice done during the course and links to screenshots stored in `docs/screenshots/`.

## Checklist (CI/Kubernetes via Kind)
- [x] Published image to GHCR: `ghcr.io/<owner>/k8s-course-app:latest`
- [x] Ran E2E workflow that provisions a Kind cluster
- [x] Applied manifests via `kubectl apply -k k8s/`
- [x] Set deployment image to GHCR `:latest`
- [x] Verified rollout and pods running
- [x] Port-forwarded service and accessed app endpoints

## Commands Used (from CI run)
Key commands executed inside the workflow:

```
kubectl apply -k k8s/
kubectl set image deployment/k8s-course-app app=ghcr.io/<owner>/k8s-course-app:latest
kubectl rollout status deployment/k8s-course-app
kubectl port-forward svc/k8s-course-app 8080:80
curl http://localhost:8080/
curl http://localhost:8080/healthz
curl http://localhost:8080/readyz
```

## Screenshots
Place the following screenshot files under `docs/screenshots/` and check them off:

- [ ] `01_nodes.png` – Content of `nodes.txt`
- [ ] `02_get_all.png` – Content of `k8s_get_all.txt`
- [ ] `03_deployment_desc.png` – Content of `deployment_desc.txt`
- [ ] `04_service_desc.png` – Content of `service_desc.txt`
- [ ] `05_rollout_status.png` – Rollout status (from CI logs)
- [ ] `06_app_response.png` – JSON from root endpoint (`app_response.json`)
- [ ] `07_healthz.png` – `/healthz` response (`healthz.txt`)
- [ ] `08_readyz.png` – `/readyz` response (`readyz.txt`)

## Notes
- Config and secret are in `k8s/configmap.yaml` and `k8s/secret-example.yaml`.
- Probes: liveness `/healthz`, readiness `/readyz`.
- Service is ClusterIP; access via `kubectl port-forward` on port 8080 in CI.