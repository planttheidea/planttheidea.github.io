// external dependencies
import moize from 'moize';
import PropTypes from 'prop-types';
import React from 'react';
import Github from 'react-icons/lib/go/logo-github';
import ReactMarkdown from 'react-markdown';
import {connect} from 'react-redux';
import styled from 'styled-components';

// actions
import * as repositoryActions from 'actions/repositoryActions';

// components
import Button from 'components/Button';
import Drawer from 'components/Drawer';

export const SlimButton = styled(Button)`
  padding: 1px 15px 0;
`;

export const GithubLogo = styled(Github)`
  font-size: 36px;
  margin-top: 1px;
`;

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

export const createOnClickViewOnGithub = moize.simple((url) => {
  return () => {
    const newTab = window.open(url, '_blank');

    newTab.referrer = null;
    newTab.focus();
  };
});

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

  return {
    isLoadingReadme,
    markdown: readme ? atob(readme.content) : null,
    projectName,
    readmeError,
    readmeUrl: readme ? readme.html_url : null
  };
};

const mapDispatchToProps = {
  ...repositoryActions
};

export const RepositoryReadmeDawer = ({clearReadme, isLoadingReadme, markdown, projectName, readmeUrl}) => {
  return (
    <Drawer
      header={projectName}
      isActive={!!projectName}
      isLoading={isLoadingReadme}
      onClose={clearReadme}
    >
      <SlimButton onClick={createOnClickViewOnGithub(readmeUrl)}>
        View on <GithubLogo />
      </SlimButton>

      {markdown && (
        /* eslint-disable prettier */
        <ReactMarkdown
          allowNode={determineAllowNode}
          source={markdown}
        />
        /* eslint-enable */
      )}
    </Drawer>
  );
};

RepositoryReadmeDawer.displayName = 'RepositoryReadmeDawer';

RepositoryReadmeDawer.propTypes = {
  clearReadme: PropTypes.func.isRequired,
  isLoadingReadme: PropTypes.bool.isRequired,
  markdown: PropTypes.string,
  projectName: PropTypes.string,
  readmeError: PropTypes.object,
  readmeUrl: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryReadmeDawer);
