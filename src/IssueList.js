import React from 'react';

import Issue from './Issue';
import Paginator from './Paginator';

const IssueList = ({ issues, links, page, clickHandler }) => {
    const issueList = issues ? issues.map(issue => <Issue key={issue.id} issue={issue}/>) : [];
    return(
        <div className="issueList">
            {issueList}
            <Paginator links={links} page={page} clickHandler={clickHandler}/>
        </div>
    );
}

export default IssueList;