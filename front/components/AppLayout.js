import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import useInput from '../hooks/useinput';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const Global = createGlobalStyle`
    .ant-row{
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child{
        padding-left: 0 !important;
    }
    .ant-col:last-child{
        padding-right: 0 !important;
    }

`;

const SearchInput = styled(Input.Search)`
    verrical-align: middle;
`;

// const style = useMemo(()=>({marginTop: 10}), [])

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>홈</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>

      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://naturenscent.tistory.com/" target="_blank" rel="noreferrer noopener">Blog</a>
        </Col>
      </Row>

    </div>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
