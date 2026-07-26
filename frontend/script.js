const healthBtn = document.getElementById("healthBtn");

const statusElement = document.getElementById("status");
const responseTimeElement = document.getElementById("responseTime");
const lastCheckedElement = document.getElementById("lastChecked");

const platformInfoElement = document.getElementById("platformInfo");
const systemInfoElement = document.getElementById("systemInfo");

/*
 * Backend URL
 *
 * During local testing:
 * http://localhost:8000
 *
 * Later in Kubernetes we'll simply use:
 * /api
 */
const API_BASE = "/api";    

async function loadHealth() {

    const start = performance.now();

    try {

        const response = await fetch(`${API_BASE}/health`);
        const data = await response.json();

        const end = performance.now();

        statusElement.innerHTML = "🟢 " + data.status;
        responseTimeElement.innerHTML =
            `${Math.round(end - start)} ms`;

        lastCheckedElement.innerHTML =
            new Date().toLocaleString();

    } catch (error) {

        statusElement.innerHTML = "🔴 DOWN";
        responseTimeElement.innerHTML = "-";
        lastCheckedElement.innerHTML =
            new Date().toLocaleString();

        console.error(error);
    }

}

async function loadPlatformInfo() {

    try {

        const response = await fetch(`${API_BASE}/info`);

        const data = await response.json();

        platformInfoElement.innerHTML = `
            <div class="row">
                <span>Application</span>
                <span>${data.application}</span>
            </div>

            <div class="row">
                <span>Version</span>
                <span>${data.version}</span>
            </div>

            <div class="row">
                <span>Environment</span>
                <span>${data.environment}</span>
            </div>
        `;

    } catch (err) {

        platformInfoElement.innerHTML =
            "Unable to fetch platform information.";

    }

}

async function loadSystemInfo() {

    try {

        const response = await fetch(`${API_BASE}/system`);

        const data = await response.json();

        systemInfoElement.innerHTML = `
            <div class="row">
                <span>Hostname</span>
                <span>${data.hostname}</span>
            </div>

            <div class="row">
                <span>Platform</span>
                <span>${data.os}</span>
            </div>

            <div class="row">
                <span>Python</span>
                <span>${data.python_version}</span>
            </div>
        `;

    } catch (err) {

        systemInfoElement.innerHTML =
            "Unable to fetch system information.";

    }

}

healthBtn.addEventListener("click", loadHealth);

window.onload = async () => {

    await loadHealth();
    await loadPlatformInfo();
    await loadSystemInfo();

};