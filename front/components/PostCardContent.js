import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { Textarea } = Input;
const PostCardContent = ({ postData, editMode, onCancelUpdate, onChangePost }) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  });

  return (
    <div>
      {editMode ? (
        <>
          <Textarea value={editText} onChagne={onChangeText} />
          <Button.Group>

            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
            <Button type="danger" onClick={onCancelUpdate}>취소</Button>

          </Button.Group>
        </>
      )
        : postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/)) {
            return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
          }
          return v;
        })}

    </div>
  );
};
PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

PostCardContent.propTypes = {
  editMode: false,
};

export default PostCardContent;
