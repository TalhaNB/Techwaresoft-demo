import { useEffect, useState } from "react";
import IssuesGrid from "./components/IssuesGrid";
import { LocalIssueType } from "./dummyIssue";

function GitHubIssueTracker() {
  const [repoName, setRepoName] = useState("");
  const [issues, setIssues] = useState<[]>([]);
  const [starredIssues, setStarredIssues] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubIssues = async () => {
    setIssues([]); // Clear previous issues
    setError(null); // Clear previous errors

    if (!repoName) {
      setError("Please enter a repository name.");
      return;
    }

    const url = `https://api.github.com/repos/${repoName}/issues?state=open`;
    const headers = {
      Accept: "application/vnd.github+json",
    };

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, ${errorJson.message}`);
      }

      const data = await response.json();
      setIssues(data);
    } catch {
      setError("Unable to load issues, check repository name and try again");
    }
  };

  const fetchStarredIssues = async () => {
    const url = `http://127.0.0.1:3000/favorites`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.data.length > 0) setStarredIssues(data.data);
    } catch {
      console.log("Unable to load starred issues, check server status and try again");
    }
  };

  const handleClear = () => {
    setRepoName("");
    setIssues([]); // Clear previous issues
    setError(null); // Clear previous errors
    fetchStarredIssues();
  };
  useEffect(() => {
    if (starredIssues.length < 1) {
      fetchStarredIssues();
    }
  }, [starredIssues]);

  return (
    <div>
      <h1>GitHub Issue Tracker</h1>
      <label htmlFor="repoInput">Repository (owner/repo):</label>
      <input
        type="text"
        id="repoInput"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
        placeholder="owner/repo"
        style={{ width: "300px" }}
      />
      <button onClick={fetchGitHubIssues}>Fetch Issues</button>
      <button onClick={handleClear}>Clear</button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <IssuesGrid
          issues={repoName === "" ? starredIssues : issues}
          starredIssues={starredIssues.map((issue: LocalIssueType) => parseInt(issue.issue_id))}
          error={error as string}
          fetchStarredIssues={fetchStarredIssues}
        />
      </div>
    </div>
  );
}

export default GitHubIssueTracker;
