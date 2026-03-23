# Github-Repo-Access-Analyzer
A Node.js-based service that connects to the GitHub API and generates a detailed report of which users have access to which repositories within a given organization.
This project helps organizations gain visibility into repository access and user permissions in a scalable and efficient way.

---

##  Features

- 1. Secure GitHub authentication using Personal Access Token
- 2. Fetch all repositories of an organization
- 3. Retrieve collaborators for each repository
- 4. Generate user-to-repository access mapping
- 5. Optimized API calls with retry & rate limit handling
- 6. REST API endpoint for access report
- 7. Interactive Dashboard UI with charts & analytics

---

##  Tech Stack

- Backend: Node.js, Express.js
- API Client: Axios
- Frontend: HTML, CSS, JavaScript
- Charts: Chart.js
- Environment: dotenv

---

##  Setup Instructions
### 1️. Clone the repository

```bash
git clone https://github.com/lucky092003/Github-Repo-Access-Analyzer.git
cd github-access-report
```
### 2. Install dependencies
- npm install

### 3. Configure Environment Variables
Create a .env file in the root directory and add
- GITHUB_TOKEN=your_github_personal_access_token
- ORG_NAME=your_github_organization_name
- PORT=3000

#### How to Generate GitHub Token
1. Go to GitHub Settings
2. Navigate to Developer Settings → Personal Access Tokens
3. Generate a token with permissions:repo , read:org

### 4. Start the server
- npm start
-  Server will run on : http://localhost:3000/api/report

### 5. Frontend Dashboard
Open the HTML file in your browser:
- 1. index.html

---- 


## Sample Images

- 1. Frontend View:
- <img width="1872" height="812" alt="image" src="https://github.com/user-attachments/assets/270fbe44-c01e-483b-9759-ad455e232868" />

- 2. Backend View:
- <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/51dc6dfd-0b62-410d-af0d-1609bdf3c145" />


