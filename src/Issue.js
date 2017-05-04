import React from 'react';
import { Link } from 'react-router-dom';

const Issue = ({ issue }) =>{
    return(
        <div className="issue">
            <div className="user">
                <img src={`${issue.user.avatar_url}`} alt="user"/>
                <h5>{issue.user.login}</h5>
                <a href={`${issue.user.html_url}`} target="_blank">Профиль</a>
            </div>
            <div className="details">
                <h5>{issue.title}</h5>
                <p>Номер: {issue.number}</p>
                <p>Создано: {issue.created_at}</p>
                <Link to={`/${issue.id}`}>Подробнее</Link>
            </div>
        </div>
    );
};

export default Issue;