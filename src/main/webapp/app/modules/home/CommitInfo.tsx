import React from 'react';
import { Table } from 'reactstrap';
import commitData from '../../../../../../gitCommit.json';
import { Translate } from 'react-jhipster';

export const CommitInfo = () => {
  return (
    <div>
      <h2>
        <Translate contentKey="home.git.title">Latest Commits</Translate>
      </h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <Translate contentKey="home.git.hash">Commit Hash</Translate>
            </th>
            <th>
              <Translate contentKey="home.git.message">Message</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {commitData.map((commit, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{commit.commit}</td>
              <td>{commit.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CommitInfo;
