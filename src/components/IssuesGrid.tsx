import { IssueType } from "../dummyIssue";
import IssueItem from "./IssueItem";

interface IssuesGridProps {
  issues: IssueType[];
  starredIssues: number[];
  error: string;
  fetchStarredIssues: () => Promise<void>;
}

const IssuesGrid: React.FC<IssuesGridProps> = ({ issues, error, fetchStarredIssues, starredIssues }) => {
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!issues) {
    return null; // or <p>Loading...</p> if you want a loading indicator
  }

  if (issues.length === 0) {
    return <p>No open issues found.</p>;
  }

  return (
    <div className="mainGrid">
      {issues.map((issue: IssueType) => (
        <IssueItem
          issue={issue}
          starred={starredIssues.includes(parseInt(`${issue.issue_id || issue.id}`))}
          key={`issue-${issue.id}`}
          fetchStarredIssues={fetchStarredIssues}
        />
      ))}
    </div>
  );
};

export default IssuesGrid;
