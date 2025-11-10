# Screenshots Instructions

Add PNG files here to document your work. Suggested filenames for CI/Kind run:

1. `01_nodes.png`
2. `02_get_all.png`
3. `03_deployment_desc.png`
4. `04_service_desc.png`
5. `05_rollout_status.png`
6. `06_app_response.png`
7. `07_healthz.png`
8. `08_readyz.png`

After adding images, commit and push:

```
git add docs/screenshots/*.png
git commit -m "Add course screenshots"
git push origin main
```

Tip: You can open the workflow artifact `k8s-e2e-artifacts` and take screenshots of the text files (`nodes.txt`, `k8s_get_all.txt`, etc.) as proof.