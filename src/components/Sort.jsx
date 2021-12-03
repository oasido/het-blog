const Sort = ({ blogsOrder, handleSort }) => {
  return (
    <div className="sort-by">
      <h3>
        {blogsOrder.title === 'New' && (
          <>
            <span onClick={handleSort}>New</span>{' '}
            <span className="greyed-out" onClick={handleSort}>
              Old
            </span>
          </>
        )}
        {blogsOrder.title === 'Old' && (
          <>
            <span className="greyed-out" onClick={handleSort}>
              New
            </span>{' '}
            <span onClick={handleSort}>Old</span>
          </>
        )}
      </h3>
    </div>
  );
};

export default Sort;
