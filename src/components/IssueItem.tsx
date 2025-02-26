import { IssueType } from "../dummyIssue";

interface IssueItemProps {
  issue: IssueType;
  fetchStarredIssues: () => Promise<void>;
  starred: boolean;
}

const handleNewFavorite = async (issue: IssueType) => {
  await fetch("http://127.0.0.1:3000/favorites", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repository_url: issue.repository_url,
      issue_url: issue.html_url,
      issue_id: issue.id,
      issue_title: issue.title,
      issue_author_name: issue.user.login,
      issue_author_profile: issue.user.html_url,
      issue_number: issue.number,
    }),
  });
};

const handleFavoriteRemove = async (issue: IssueType) => {
  await fetch(`http://127.0.0.1:3000/favorites/${issue.id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

function handleStar(issue: IssueType, setStarredIssues: React.Dispatch<React.SetStateAction<[]>>) {
  if (issue.issue_id) {
    handleFavoriteRemove(issue).finally(() => setStarredIssues([]));
  } else {
    handleNewFavorite(issue).finally(() => setStarredIssues([]));
  }
}

const IssueItem: React.FC<IssueItemProps> = ({ issue, fetchStarredIssues, starred }) => {
  return (
    <div className="card" key={issue.id || issue.issue_id}>
      <div className="container">
        <div style={{ position: "relative", top: "10px", left: "90%" }}>
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => handleStar(issue, fetchStarredIssues!)}
          >
            <span className={starred ? "fa fa-star checked" : "fa fa-star"} style={{ fontSize: "22px" }} />
          </button>
        </div>
        <h4 style={{ marginTop: 0 }}>
          Issue#&nbsp;
          <a href={issue.html_url || issue.issue_url} target="_blank">
            {issue.number || issue.issue_number}
          </a>
        </h4>
        <p>
          <b>Title:&nbsp;</b>
          {(issue.title || issue.issue_title).split("]: ")[1] || "N/A"}
        </p>
        <b>Author:</b>{" "}
        <a href={issue.issue_author_profile || issue.user.html_url} target="_blank">
          {issue.issue_author_name || issue.user?.login || "Unknown"}
        </a>
        <hr />
        {issue.labels && (
          <>
            <p>Labels: {issue.labels?.map((label) => label.name).join(", ") || ""}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueItem;
