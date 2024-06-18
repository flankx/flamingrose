import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { APP_DATETIME_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getVideos } from './video-management.reducer';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import VideoAlert from '../video-play/video-alert';

export const VideoManagement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const getVideosFromProps = () => {
    dispatch(
      getVideos({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      }),
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getVideosFromProps();
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sortParam = params.get(SORT);
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === ASC ? DESC : ASC,
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getVideosFromProps();
  };

  const account = useAppSelector(state => state.authentication.account);
  const videos = useAppSelector(state => state.videoManagement.videos);
  const totalItems = useAppSelector(state => state.videoManagement.totalItems);
  const loading = useAppSelector(state => state.videoManagement.loading);
  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = pagination.sort;
    const order = pagination.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        <Translate contentKey="videoManagement.home.title">Meidia Center</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="videoManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="new" className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="videoManagement.home.createLabel">Create a new media</Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
            </th>
            <th className="hand" onClick={sort('name')}>
              <Translate contentKey="videoManagement.name">Name</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
            </th>
            <th className="hand" onClick={sort('code')}>
              <Translate contentKey="videoManagement.code">Code</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('code')} />
            </th>
            <th />
            <th className="hand" onClick={sort('pic')}>
              <Translate contentKey="videoManagement.pic">Pic</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('pic')} />
            </th>
            <th>
              <Translate contentKey="videoManagement.url">Url</Translate>
            </th>
            <th>
              <Translate contentKey="videoManagement.desc">Desc</Translate>
            </th>
            <th className="hand" onClick={sort('createdDate')}>
              <Translate contentKey="videoManagement.createdDate">Created Date</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('createdDate')} />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              <Translate contentKey="videoManagement.lastModifiedBy">Last Modified By</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedBy')} />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              <Translate contentKey="videoManagement.lastModifiedDate">Last Modified Date</Translate>{' '}
              <FontAwesomeIcon icon={getSortIconByFieldName('lastModifiedDate')} />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {videos.map((video, i) => (
            <tr id={video.id} key={`video-${i}`}>
              <td>
                <Button tag={Link} to={video.id} color="link" size="sm">
                  {video.id}
                </Button>
              </td>
              <td>{video.name}</td>
              <td>{video.code}</td>
              <td />
              <td>{video.pic}</td>
              <td>
                <VideoAlert id={video.id} url={video.url}>
                  <Link to="/entity/video-play" state={{ url: video.url }} className="alert-link" id={'tooltip-' + video.id}>
                    {/* <Translate contentKey="entity.action.play">Play</Translate> */}
                    <FontAwesomeIcon icon={faYoutube} size="xl"></FontAwesomeIcon>
                  </Link>
                </VideoAlert>
              </td>
              <td>{video.desc}</td>
              <td>
                {video.createdDate ? (
                  <TextFormat value={video.createdDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td>{video.lastModifiedBy}</td>
              <td>
                {video.lastModifiedDate ? (
                  <TextFormat value={video.lastModifiedDate} type="date" format={APP_DATETIME_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-end">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${video.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${video.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${video.id}/delete`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={videos?.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default VideoManagement;
