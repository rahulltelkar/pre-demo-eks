# Cloud-Native Two-Tier Application on Amazon EKS

## Project Overview

This repository contains a cloud-native two-tier web application designed to demonstrate containerization, Kubernetes application deployment, and CI/CD automation on Amazon Elastic Kubernetes Service (Amazon EKS).

The project consists of a static frontend and a Python-based backend API, both containerized using Docker and deployed to Kubernetes using Helm charts. A Jenkins pipeline automates the application build and deployment process, while the AWS Load Balancer Controller provisions an Application Load Balancer (ALB) to expose the application externally.

In addition to application deployment, the repository includes supporting components such as the Metrics Server for Kubernetes resource monitoring and k6 scripts for basic load testing.

The AWS infrastructure required to host this application—including the VPC, Amazon EKS cluster, IAM resources, networking components, and Terraform remote backend—is maintained in a separate infrastructure repository.

---

## Key Features

- Two-tier web application with frontend and backend services
- Docker-based containerization
- Kubernetes deployment using Helm charts
- Automated CI/CD pipeline using Jenkins
- External application access through AWS Load Balancer Controller
- Metrics Server integration for Kubernetes resource metrics
- Load testing using k6
- Production-oriented repository structure following DevOps best practices

---

## Related Repository

The infrastructure required to deploy this application is maintained separately.

**Infrastructure Repository**

👉 **aws-eks-terraform-infra**

This repository provisions:

- Amazon VPC
- Amazon EKS Cluster
- Managed Node Groups
- IAM Roles and Policies
- OIDC Provider
- AWS Load Balancer Controller IAM configuration
- Terraform Remote Backend (Amazon S3 + DynamoDB)

## Solution Architecture

The application follows a cloud-native two-tier architecture deployed on Amazon Elastic Kubernetes Service (Amazon EKS).

```text
                         Internet
                             │
                             ▼
              AWS Application Load Balancer
                             │
                             ▼
                    Kubernetes Ingress
                             │
          ┌──────────────────┴──────────────────┐
          ▼                                     ▼
Frontend Service                     Backend API Service
          │                                     │
          ▼                                     ▼
Frontend Pods                        Backend Pods
 (Nginx + Static UI)              (Python REST API)
          │
          ▼
     Amazon EKS Cluster
```

---

### Architecture Workflow

1. Users access the application through the AWS Application Load Balancer (ALB).
2. The AWS Load Balancer Controller automatically provisions and manages the ALB based on the Kubernetes Ingress resource.
3. Incoming requests are routed to the Frontend Kubernetes Service.
4. The Frontend application communicates with the Backend API through the Backend Kubernetes Service.
5. Both application components run as independent Kubernetes Deployments managed by Helm charts.
6. The application is deployed to Amazon EKS using a Jenkins CI/CD pipeline.
7. Kubernetes Metrics Server provides resource metrics for the cluster.
8. k6 scripts can be used to perform basic load testing on the deployed application.

---

### Architecture Components

| Component | Purpose |
|-----------|---------|
| Frontend | Serves the web user interface using Nginx |
| Backend API | Processes application requests and business logic |
| Docker | Containerizes both application components |
| Helm | Packages and deploys Kubernetes resources |
| Amazon EKS | Hosts the Kubernetes workloads |
| Kubernetes Services | Enable communication between application components |
| Kubernetes Ingress | Exposes the application externally |
| AWS Load Balancer Controller | Automatically provisions and manages the Application Load Balancer |
| Jenkins | Automates build and deployment of the application |
| Metrics Server | Provides Kubernetes resource metrics |
| k6 | Performs load testing to validate application performance |

## Application Overview

This project demonstrates a cloud-native two-tier web application consisting of a static frontend and a Python-based backend API.

The backend exposes REST APIs that provide application and runtime information, including:

- Application health status
- Application metadata (name, version, and environment)
- Runtime system information such as hostname, operating system, and Python version

The frontend provides a simple web interface that consumes these APIs and displays the information to the user.

The frontend and backend are deployed as independent Kubernetes workloads and communicate internally through Kubernetes Services.

The application is containerized using Docker, deployed to Amazon EKS using Helm charts, and exposed externally through an AWS Application Load Balancer (ALB). A Jenkins CI/CD pipeline automates the build and deployment process, and k6 scripts are included for basic load testing.

Although the application functionality is intentionally simple, its primary purpose is to demonstrate modern cloud-native application deployment practices, including containerization, Kubernetes orchestration, Helm-based deployments, CI/CD automation, and application validation on Amazon EKS.

### Available API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/health` | Returns the application health status. |
| `/api/info` | Returns application metadata including name, version, and environment. |
| `/api/system` | Returns runtime information such as hostname, operating system, and Python version. |

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Python (FastAPI) | Backend REST API development |
| HTML, CSS, JavaScript | Frontend user interface |
| Docker | Containerization of frontend and backend applications |
| Kubernetes | Container orchestration and application deployment |
| Helm | Kubernetes package management and application deployment |
| Amazon EKS | Managed Kubernetes service |
| Jenkins | CI/CD pipeline automation |
| AWS Load Balancer Controller | Automatic provisioning of AWS Application Load Balancers |
| NGINX | Serves the static frontend application |
| Metrics Server | Kubernetes resource metrics collection |
| k6 | Load and performance testing |

---

### Why These Technologies?

#### Python (FastAPI)

FastAPI is used to build a lightweight and high-performance REST API that exposes application health, metadata, and runtime system information.

#### Docker

Docker packages the frontend and backend into portable container images, ensuring consistent deployments across different environments.

#### Kubernetes

Kubernetes orchestrates application deployment, scaling, networking, and lifecycle management of containerized workloads.

#### Helm

Helm simplifies Kubernetes deployments by packaging related Kubernetes resources into reusable and version-controlled charts.

#### Amazon EKS

Amazon Elastic Kubernetes Service (EKS) provides a managed Kubernetes control plane, reducing operational overhead while offering a production-ready Kubernetes environment.

#### Jenkins

Jenkins automates the application build and deployment workflow, enabling consistent and repeatable CI/CD processes.

#### AWS Load Balancer Controller

The AWS Load Balancer Controller automatically provisions and manages an Application Load Balancer (ALB) based on Kubernetes Ingress resources, providing external access to the application.

#### Metrics Server

Metrics Server collects CPU and memory usage metrics from Kubernetes nodes and pods, enabling resource monitoring.

#### k6

k6 is used to perform load testing and validate the application's behavior under concurrent user traffic.

## Repository Structure

```text
.
├── backend/                  # FastAPI backend application
├── frontend/                 # Static frontend application
├── helm/                     # Helm charts for Kubernetes deployment
│   ├── aws-load-balancer-controller/
│   ├── metrics-server/
│   ├── platform-api/
│   ├── platform-frontend/
│   └── platform-ingress/
├── k6/                       # Load testing scripts
├── Jenkinsfile               # CI/CD pipeline definition
└── README.md
```

---

### Directory Overview

| Directory/File | Description |
|---------------|-------------|
| `backend/` | Contains the FastAPI backend application and its Dockerfile. |
| `frontend/` | Contains the static web application (HTML, CSS, JavaScript) and NGINX configuration. |
| `helm/` | Contains Helm charts used to deploy the application and supporting Kubernetes components. |
| `platform-api/` | Helm chart for deploying the backend API. |
| `platform-frontend/` | Helm chart for deploying the frontend application. |
| `platform-ingress/` | Helm chart that exposes the application using Kubernetes Ingress. |
| `aws-load-balancer-controller/` | Helm values used to deploy the AWS Load Balancer Controller. |
| `metrics-server/` | Helm values used to deploy Kubernetes Metrics Server. |
| `k6/` | Load testing scripts used to validate application performance. |
| `Jenkinsfile` | Defines the CI/CD pipeline for building and deploying the application. |

---

### Repository Organization

The repository is organized by responsibility to improve readability and maintainability.

- **Application Source** – Frontend and backend application code.
- **Containerization** – Dockerfiles for packaging the applications.
- **Deployment** – Helm charts for Kubernetes deployment.
- **CI/CD** – Jenkins pipeline for automated build and deployment.
- **Performance Testing** – k6 scripts for validating application performance.

This structure separates development, deployment, automation, and testing concerns, making the project easier to maintain and extend.

## Application Components

The application is built using a modular two-tier architecture, where each component has a specific responsibility.

---

### Frontend

The frontend is a lightweight static web application built using HTML, CSS, and JavaScript. It is served using NGINX and provides a user interface for interacting with the backend API.

**Responsibilities**

- Display the web interface
- Invoke backend REST APIs
- Present application and system information
- Run as an independent Kubernetes Deployment

---

### Backend

The backend is developed using FastAPI and exposes REST APIs that provide application health, metadata, and runtime system information.

Available APIs include:

- `/api/health` – Returns the application health status.
- `/api/info` – Returns application metadata such as application name, version, and environment.
- `/api/system` – Returns runtime information including hostname, operating system, and Python version.

The backend is deployed independently as a Kubernetes Deployment.

---

### Docker

Both the frontend and backend are containerized using Docker.

Separate Dockerfiles are maintained for each application component, allowing them to be built, versioned, and deployed independently.

---

### Helm Charts

The application is deployed using Helm charts.

Separate Helm charts are provided for:

- Frontend
- Backend API
- Kubernetes Ingress

Supporting Helm configurations are also included for:

- AWS Load Balancer Controller
- Metrics Server

This modular Helm structure simplifies application deployment, upgrades, and configuration management.

---

### Jenkins CI/CD Pipeline

A Jenkins pipeline automates the application deployment workflow by:

- Building Docker images
- Pushing images to the container registry
- Deploying the application to Amazon EKS using Helm

This enables repeatable and consistent deployments.

---

### Load Testing

The repository includes k6 scripts for basic performance testing.

These scripts simulate concurrent user requests and help validate application availability and responsiveness after deployment.

## Docker Configuration

The frontend and backend applications are containerized independently using Docker. Each component has its own Dockerfile, allowing them to be built, versioned, and deployed separately.

---

### Frontend Container

The frontend is packaged as a lightweight NGINX container that serves the static web application.

The Docker image includes:

- HTML
- CSS
- JavaScript
- NGINX configuration

The container is responsible for serving the user interface and forwarding API requests to the backend service.

---

### Backend Container

The backend is built using FastAPI and packaged into a separate Docker image.

The Docker image includes:

- FastAPI application source code
- Python dependencies
- Application configuration

The backend exposes REST APIs that provide application health, metadata, and runtime system information.

---

### Image Build Process

Each application component is built independently using its respective Dockerfile.

Example commands:

```bash
# Build frontend image
docker build -t platform-frontend:latest ./frontend

# Build backend image
docker build -t platform-api:latest ./backend
```

The generated images are then pushed to a container registry as part of the Jenkins CI/CD pipeline before being deployed to Amazon EKS.

---

### Why Separate Docker Images?

Maintaining separate container images provides several benefits:

- Independent development and deployment
- Faster application updates
- Smaller container images
- Easier version management
- Improved scalability

For example, updates to the frontend can be deployed without rebuilding or redeploying the backend, and vice versa.

## CI/CD Pipeline

The project uses Jenkins to automate the complete application build, validation, deployment, and testing workflow on Amazon EKS.

The pipeline follows a Continuous Integration and Continuous Deployment (CI/CD) approach, reducing manual effort and ensuring consistent deployments.

---

### Pipeline Workflow

```text
Developer
    │
    ▼
Push Code to Git Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Checkout Source Code
    ├── Build Docker Images (Parallel)
    ├── Trivy Image Security Scan
    ├── Push Images to Docker Hub
    ├── Helm Lint Validation
    ├── Helm Template Validation
    ├── Install Cluster Add-ons
    ├── Deploy Application using Helm
    ├── Smoke Test
    ├── k6 Load Test
    └── Automatic Rollback (on failure)
    │
    ▼
Amazon EKS Cluster
```

---

### Pipeline Stages

| Stage | Description |
|--------|-------------|
| Checkout | Retrieves the latest application source code from the Git repository. |
| Build Images | Builds frontend and backend Docker images in parallel to reduce pipeline execution time. |
| Trivy Scan | Scans Docker images for High and Critical vulnerabilities before deployment. |
| Push Images | Pushes versioned Docker images to Docker Hub. |
| Helm Lint | Validates the Helm charts for syntax and configuration issues. |
| Helm Template | Renders Kubernetes manifests locally to validate Helm templates before deployment. |
| Install Cluster Add-ons | Installs or upgrades the Metrics Server and AWS Load Balancer Controller required by the application. |
| Deploy to EKS | Deploys or upgrades the frontend, backend, and Ingress resources using Helm charts. |
| Smoke Test | Waits for the Application Load Balancer (ALB) to become available and verifies the application's health endpoint. |
| Load Test | Executes k6 load tests against the deployed application to validate basic performance and availability. |
| Rollback | Automatically rolls back Helm releases if the deployment fails. |
| Cleanup | Cleans the Jenkins workspace after every pipeline execution. |

## Helm Charts

The application is deployed to Amazon EKS using Helm, the Kubernetes package manager. Helm simplifies application deployment by packaging Kubernetes resources into reusable and configurable charts.

---

### Helm Chart Structure

The repository contains separate Helm charts for each deployable application component.

| Helm Chart | Purpose |
|------------|---------|
| `platform-api` | Deploys the FastAPI backend application. |
| `platform-frontend` | Deploys the frontend web application. |
| `platform-ingress` | Configures Kubernetes Ingress to expose the application through the AWS Load Balancer Controller. |
| `aws-load-balancer-controller` | Provides custom configuration values for deploying the AWS Load Balancer Controller. |
| `metrics-server` | Provides configuration for deploying the Kubernetes Metrics Server. |

---

### Application Deployment

The Jenkins pipeline deploys the application using Helm upgrade commands, ensuring that existing releases are upgraded when present or installed if they do not already exist.

The deployment includes:

- Backend application
- Frontend application
- Kubernetes Ingress

Supporting cluster components such as the AWS Load Balancer Controller and Metrics Server are also installed or upgraded as part of the deployment process.

---

### Why Helm?

Helm provides several advantages over managing individual Kubernetes manifests:

- Simplifies Kubernetes deployments
- Supports reusable deployment templates
- Enables environment-specific configuration through values files
- Makes application upgrades and rollbacks straightforward
- Provides release management for Kubernetes applications

---

### Helm Validation

Before deployment, the Jenkins pipeline validates the Helm charts by executing:

- Helm Lint
- Helm Template

These validation steps help identify chart configuration issues before deployment to the Kubernetes cluster.

---

### Pipeline Highlights

The pipeline includes several production-inspired practices:

- Parallel Docker image builds for improved execution speed.
- Container image vulnerability scanning using Trivy.
- Helm chart validation before deployment.
- Automated installation of required Kubernetes cluster add-ons.
- Versioned Docker image deployments.
- Automated smoke testing after deployment.
- Basic load testing using k6.
- Automatic Helm rollback on deployment failure.
- Workspace cleanup after every pipeline execution.

---

### Benefits of the CI/CD Pipeline

The automated pipeline provides several advantages:

- Consistent and repeatable deployments
- Reduced manual intervention
- Early detection of deployment issues
- Security validation through image scanning
- Automated application verification
- Faster release cycles
- Improved deployment reliability

## Deployment Workflow

The application deployment process follows an automated CI/CD workflow that builds, validates, deploys, and verifies the application on Amazon EKS.

---

### End-to-End Deployment Flow

```text
Developer
    │
    ▼
Push Code to Git Repository
    │
    ▼
Jenkins Pipeline
    │
    ├── Checkout Source Code
    ├── Build Frontend & Backend Docker Images
    ├── Trivy Security Scan
    ├── Push Images to Docker Hub
    ├── Helm Lint & Template Validation
    ├── Install/Upgrade Cluster Add-ons
    ├── Deploy Application using Helm
    ├── Smoke Test
    ├── k6 Load Test
    └── Rollback (if deployment fails)
    │
    ▼
Amazon EKS Cluster
    │
    ▼
AWS Load Balancer Controller
    │
    ▼
Application Load Balancer (ALB)
    │
    ▼
Kubernetes Ingress
    │
    ▼
Frontend Service
    │
    ▼
Backend Service
```

---

### Deployment Steps

1. A developer pushes application code to the Git repository.

2. Jenkins automatically starts the CI/CD pipeline.

3. The frontend and backend Docker images are built in parallel.

4. Trivy scans both container images for High and Critical vulnerabilities.

5. The validated Docker images are pushed to Docker Hub.

6. Helm validates the deployment configuration using linting and template rendering.

7. Required Kubernetes add-ons such as the Metrics Server and AWS Load Balancer Controller are installed or upgraded.

8. Helm deploys or upgrades the frontend, backend, and ingress resources on the Amazon EKS cluster.

9. The AWS Load Balancer Controller provisions an Application Load Balancer (ALB) for external access.

10. Jenkins performs smoke testing to verify that the application is healthy.

11. A k6 load test validates the application's availability and basic performance.

12. If any deployment stage fails, Jenkins automatically rolls back the Helm releases to the previous stable version.

---

### Deployment Outcome

After a successful deployment:

- The frontend application is accessible through the AWS Application Load Balancer.
- API requests are routed through Kubernetes Ingress to the FastAPI backend.
- Kubernetes manages application scaling, networking, and self-healing.
- Jenkins verifies that the deployment completed successfully before marking the pipeline as successful.

  ## Load Testing

The project uses **k6** to perform basic load testing after a successful deployment.

The load test validates that the application is accessible through the AWS Application Load Balancer (ALB) and can handle concurrent requests.

---

### Objectives

The load test is used to:

- Verify application availability
- Validate API responsiveness
- Simulate concurrent user requests
- Detect deployment issues after release

---

### CI/CD Integration

The Jenkins pipeline automatically executes the k6 load test after:

- Docker images are built and pushed
- Helm deployment completes successfully
- Smoke testing confirms the application is healthy

This provides an additional layer of deployment validation before the pipeline is marked as successful.

---

### Running the Test Manually

```bash
k6 run --env BASE_URL=http://<ALB_HOSTNAME> k6/load.js
```

---

### Benefits

Using k6 provides several advantages:

- Automated post-deployment validation
- Performance verification
- Early detection of runtime issues
- Repeatable load testing

## Application Verification

After the application has been deployed successfully, the following commands can be used to verify that all components are running correctly.

---

### Verify Kubernetes Resources

Check that all application pods are running.

```bash
kubectl get pods -n <Namespace>
```

Expected output:

- Frontend pod in `Running` state
- Backend pod in `Running` state

---

### Verify Services

List the Kubernetes services.

```bash
kubectl get svc -n <Namespace>
```

Expected output:

- Frontend Service
- Backend Service

---

### Verify Ingress

Verify that the Kubernetes Ingress has been created and an AWS Application Load Balancer (ALB) has been provisioned.

```bash
kubectl get ingress -n <Namespace>
```

The output should display the ALB hostname under the **ADDRESS** column.

---

### Verify Application Health

Check the backend health endpoint.

```bash
curl http://<ALB_HOSTNAME>/api/health
```

Expected response:

```json
{
  "status": "UP"
}
```

## Best Practices

The following best practices were followed while developing and deploying this project to improve maintainability, reliability, security, and deployment consistency.

---

### Containerization

- Build the frontend and backend as separate Docker images to enable independent development and deployment.
- Keep container images lightweight by including only the required dependencies.
- Use image versioning alongside the `latest` tag for better release management and traceability.
- Maintain Python dependencies in a dedicated `requirements.txt` file instead of installing packages individually in the Dockerfile.
- Copy `requirements.txt` into the Docker image before copying the application source code to leverage Docker layer caching and reduce image build time.
- Use `--no-cache-dir` during `pip install` to reduce the final Docker image size by avoiding unnecessary package cache files.

**Why use `requirements.txt`?**

Managing dependencies through `requirements.txt` provides several advantages:

- Ensures consistent dependency versions across development, testing, and production environments.
- Makes application builds reproducible and predictable.
- Simplifies dependency management by maintaining all Python packages in a single file.
- Improves Docker build performance by taking advantage of Docker layer caching. If only the application code changes and `requirements.txt` remains unchanged, Docker reuses the cached dependency installation layer instead of reinstalling all packages.
- Keeps the Dockerfile clean and easier to maintain.

---

### Kubernetes Deployment

- Package Kubernetes resources using Helm instead of maintaining raw Kubernetes manifests.
- Deploy the frontend, backend, and ingress as independent Helm releases for easier upgrades and rollbacks.
- Use Kubernetes Services for internal communication between application components.
- Expose the application externally using Kubernetes Ingress integrated with the AWS Load Balancer Controller.
- Deploy supporting Kubernetes components, such as the Metrics Server and AWS Load Balancer Controller, before deploying the application.

---

### CI/CD

- Automate the complete build and deployment workflow using Jenkins.
- Build frontend and backend Docker images in parallel to reduce pipeline execution time.
- Perform container image vulnerability scanning using Trivy before deployment.
- Validate Helm charts using `helm lint` and `helm template` before deploying to the cluster.
- Perform automated smoke testing after deployment to verify application availability.
- Execute k6 load testing to validate basic application performance.
- Automatically roll back Helm releases if deployment verification fails.
- Clean the Jenkins workspace after every pipeline execution to avoid leftover artifacts.

---

### Security

- Store Docker Hub credentials securely using Jenkins Credentials instead of hardcoding sensitive information.
- Scan container images for High and Critical vulnerabilities using Trivy before pushing them to the container registry.
- Avoid storing secrets, passwords, or API keys directly in the application source code or Docker images.

---

### Repository Organization

- Maintain separate repositories for infrastructure and application code to clearly separate responsibilities.
- Organize application source code, Helm charts, CI/CD pipeline definitions, and testing scripts into dedicated directories.
- Track all source code, deployment configurations, and automation scripts using Git version control.

---

### Validation and Testing

- Validate Helm charts before deployment to detect configuration issues early.
- Verify application health after deployment using dedicated health endpoints.
- Include automated smoke testing and load testing as part of the deployment pipeline.
- Validate Kubernetes resources after deployment using `kubectl` and Helm commands.
---

### Verify Application Information

Retrieve application metadata.

```bash
curl http://<ALB_HOSTNAME>/api/info
```

Expected response:

- Application name
- Version
- Environment

---

### Verify Runtime Information

Retrieve runtime system details.

```bash
curl http://<ALB_HOSTNAME>/api/system
```

Expected response includes:

- Hostname
- Operating system
- Python version

---

### Verify Helm Releases

Confirm that all Helm releases have been deployed successfully.

```bash
helm list -n <Namespace>
```

Expected releases:

- platform-api
- platform-frontend
- platform-ingress

---

### Deployment Success Checklist

- ✅ Frontend pod is running.
- ✅ Backend pod is running.
- ✅ Kubernetes services are available.
- ✅ Ingress has been assigned an ALB hostname.
- ✅ Health endpoint returns HTTP 200.
- ✅ Application metadata endpoint is accessible.
- ✅ Runtime information endpoint is accessible.
- ✅ Helm releases are deployed successfully.

## Best Practices

The following best practices were followed while developing and deploying this project to improve maintainability, reliability, security, and deployment consistency.

---

### Containerization

- Build the frontend and backend as separate Docker images to enable independent development and deployment.
- Keep container images lightweight by including only the required dependencies.
- Use image versioning alongside the `latest` tag for better release management and traceability.
- Maintain Python dependencies in a dedicated `requirements.txt` file instead of installing packages individually in the Dockerfile.
- Copy `requirements.txt` into the Docker image before copying the application source code to leverage Docker layer caching and reduce image build time.
- Use `--no-cache-dir` during `pip install` to reduce the final Docker image size by avoiding unnecessary package cache files.

**Why use `requirements.txt`?**

Managing dependencies through `requirements.txt` provides several advantages:

- Ensures consistent dependency versions across development, testing, and production environments.
- Makes application builds reproducible and predictable.
- Simplifies dependency management by maintaining all Python packages in a single file.
- Improves Docker build performance by taking advantage of Docker layer caching. If only the application code changes and `requirements.txt` remains unchanged, Docker reuses the cached dependency installation layer instead of reinstalling all packages.
- Keeps the Dockerfile clean and easier to maintain.

---

### Kubernetes Deployment

- Package Kubernetes resources using Helm instead of maintaining raw Kubernetes manifests.
- Deploy the frontend, backend, and ingress as independent Helm releases for easier upgrades and rollbacks.
- Use Kubernetes Services for internal communication between application components.
- Expose the application externally using Kubernetes Ingress integrated with the AWS Load Balancer Controller.
- Deploy supporting Kubernetes components, such as the Metrics Server and AWS Load Balancer Controller, before deploying the application.

---

### CI/CD

- Automate the complete build and deployment workflow using Jenkins.
- Build frontend and backend Docker images in parallel to reduce pipeline execution time.
- Perform container image vulnerability scanning using Trivy before deployment.
- Validate Helm charts using `helm lint` and `helm template` before deploying to the cluster.
- Perform automated smoke testing after deployment to verify application availability.
- Execute k6 load testing to validate basic application performance.
- Automatically roll back Helm releases if deployment verification fails.
- Clean the Jenkins workspace after every pipeline execution to avoid leftover artifacts.

---

### Security

- Store Docker Hub credentials securely using Jenkins Credentials instead of hardcoding sensitive information.
- Scan container images for High and Critical vulnerabilities using Trivy before pushing them to the container registry.
- Avoid storing secrets, passwords, or API keys directly in the application source code or Docker images.

---

### Repository Organization

- Maintain separate repositories for infrastructure and application code to clearly separate responsibilities.
- Organize application source code, Helm charts, CI/CD pipeline definitions, and testing scripts into dedicated directories.
- Track all source code, deployment configurations, and automation scripts using Git version control.

---

### Validation and Testing

- Validate Helm charts before deployment to detect configuration issues early.
- Verify application health after deployment using dedicated health endpoints.
- Include automated smoke testing and load testing as part of the deployment pipeline.
- Validate Kubernetes resources after deployment using `kubectl` and Helm commands.

## Troubleshooting

The following are common issues that may occur during application deployment and their possible resolutions.

---

### Docker Image Build Failure

**Issue**

Docker image build fails during the Jenkins pipeline.

**Possible Causes**

- Docker daemon is not running.
- Invalid Dockerfile configuration.
- Missing application dependencies.

**Resolution**

- Verify that the Docker service is running.
- Review Docker build logs.
- Confirm that `requirements.txt` and application source files are present.

---

### Trivy Scan Failure

**Issue**

Trivy reports High or Critical vulnerabilities.

**Possible Causes**

- Vulnerable base image.
- Outdated application dependencies.

**Resolution**

- Update the base image.
- Upgrade vulnerable dependencies.
- Rebuild and rescan the Docker images.

---

### Helm Deployment Failure

**Issue**

Helm deployment fails.

**Possible Causes**

- Invalid Helm chart configuration.
- Missing Kubernetes resources.
- Incorrect values configuration.

**Resolution**

- Run `helm lint`.
- Run `helm template`.
- Verify the Helm values files.

---

### Application Load Balancer Not Created

**Issue**

The Ingress resource does not receive an ALB hostname.

**Possible Causes**

- AWS Load Balancer Controller is not running.
- Missing IAM permissions.
- Incorrect Ingress annotations.

**Resolution**

- Verify the AWS Load Balancer Controller deployment.
- Check controller logs.
- Verify Ingress annotations.

---

### Application Health Check Failure

**Issue**

The `/api/health` endpoint returns an error.

**Possible Causes**

- Backend pod is not running.
- Service routing issue.
- Application startup failure.

**Resolution**

- Verify pod status.
- Check application logs.
- Verify Kubernetes Service and Ingress configuration.

---

### Load Test Failure

**Issue**

The k6 load test fails.

**Possible Causes**

- Application is not reachable.
- ALB is not fully provisioned.
- Backend service is unavailable.

**Resolution**

- Verify the ALB hostname.
- Ensure the application is healthy.
- Re-run the smoke test before executing the load test.
