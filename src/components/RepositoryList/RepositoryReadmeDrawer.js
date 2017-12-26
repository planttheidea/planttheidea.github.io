// external dependencies
import moize from 'moize';
import PropTypes from 'prop-types';
import React from 'react';
import GithubCorner from 'react-github-corner';
import ReactMarkdown from 'react-markdown';
import {connect} from 'react-redux';
import styled from 'styled-components';

// actions
import * as repositoryActions from 'actions/repositoryActions';

// components
import Button from 'components/Button';
import ErrorNotification from 'components/ErrorNotification';
import Drawer from 'components/Drawer';

// utils
import {getParsedReadme} from 'utils/readme';

export const SlimButton = styled(Button)`
  padding: 1px 15px 0;
`;

export const StyledGithubCorner = styled(GithubCorner)`
  position: absolute;
  right: 0;
  top: 0;
`;

export const createOnClickViewOnGithub = moize.simple((url) => {
  /**
   * @function createOnClickViewOnGithub
   *
   * @description
   * when the view on github button is clicked, open a new tab with the location
   */
  return () => {
    const newTab = window.open(url, '_blank');

    newTab.referrer = null;
    newTab.focus();
  };
});

export const createTransformImageUri = moize.simple((url) => {
  /**
   * @function transformImageUri
   *
   * @description
   * change the image location to be an absolute reference instead of a relative one
   *
   * @param {string} uri the relative uri location of the image
   * @returns {string} the absolute url location of the image
   */
  return (uri) => {
    return `${url}/${uri}?raw=true`;
  };
});

/**
 * @function determineAllowNode
 *
 * @description
 * determine if the node should be visible
 *
 * @param {Object} node the node to possibly be rendered
 * @returns {boolean} should the node be rendered
 */
export const determineAllowNode = (node) => {
  const {children, type, value} = node;

  return (
    value !== 'Table of contents' &&
    !(
      type === 'list' &&
      children.some(({children: listItem}) => {
        return listItem.some(({children: paragraph}) => {
          return paragraph.some(({url}) => {
            return url && url[0] === '#';
          });
        });
      })
    )
  );
};

/**
 * @function mapStateToProps
 *
 * @description
 * map the selected values from state to props on the component
 *
 * @returns {Object} the state to map to props
 */
export const mapStateToProps = ({repository}) => {
  const {isLoadingReadme, projectName, readme, readmeError} = repository;

  const readmeUrl = readme ? readme.html_url : null;

  return {
    isLoadingReadme,
    markdown: getParsedReadme(readme),
    masterUrl: readmeUrl ? readmeUrl.replace(`/${readme.name}`, '') : null,
    projectName,
    readmeError,
    readmeUrl
  };
};

const mapDispatchToProps = {
  ...repositoryActions
};

export const RepositoryReadmeDawer = ({
  clearReadme,
  isLoadingReadme,
  markdown,
  masterUrl,
  projectName,
  readmeError,
  readmeUrl
}) => {
  return (
    <Drawer
      header={projectName}
      isActive={!!projectName}
      isLoading={isLoadingReadme}
      onClose={clearReadme}
    >
      {readmeError && (
        <ErrorNotification>Sorry, there was an error loading the README file from github.</ErrorNotification>
      )}

      {!readmeError && [
        markdown && (
          /* eslint-disable prettier */
          <ReactMarkdown
            allowNode={determineAllowNode}
            escapeHtml={false}
            key="readme-markdown"
            source={markdown}
            transformImageUri={createTransformImageUri(masterUrl)}
          />
          /* eslint-enable */
        ),
        <StyledGithubCorner
          ariaLabel="Open in github"
          bannerColor="#5d5d5d"
          href={readmeUrl}
          key="github-corner"
          target="_blank"
          title="Open in github"
        />
      ]}
    </Drawer>
  );
};

RepositoryReadmeDawer.displayName = 'RepositoryReadmeDawer';

RepositoryReadmeDawer.propTypes = {
  clearReadme: PropTypes.func.isRequired,
  isLoadingReadme: PropTypes.bool.isRequired,
  markdown: PropTypes.string,
  masterUrl: PropTypes.string,
  projectName: PropTypes.string,
  readmeError: PropTypes.object,
  readmeUrl: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryReadmeDawer);
