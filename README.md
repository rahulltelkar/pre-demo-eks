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
