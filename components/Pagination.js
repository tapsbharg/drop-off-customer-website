
export default function PageModule(props) {
  let totalItems = props.totalItems || 10;
  let itemsPerPage = props.itemsPerPage || 10;

  let totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPage = props.currentPage || 1;
  let range = props.range || 3;
  let startPage = currentPage - range;
  let endPage = currentPage + range;
  let url = props.pageUrl || "/users?";
  if (endPage > totalPages) {
    endPage = totalPages;
  }

  if (startPage < 1) {
    startPage = 1;
  }
  let pageItems = [];
  // function createLink(pageNo) {
  //   return url + "pageNo=" + pageNo;
  // }
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <li key={i} className={currentPage === i ? "active" : ""}>
        <a
          title={`Page No ${i}`}
          //   href={() => false}
          onClick={() => {
            props.pageChange(i);
          }}
        >
          <span>
            <b>{i}</b>
          </span>
        </a>
      </li>
    );
  }
  return (
    <div className="table_botm_paging">
      <ul className="pagination">
        <li>
          <a
            title="First Page"
            // href={() => false}
            onClick={() => {
              props.pageChange(1);
            }}
          >
            <span>
              <i className={"fa fa-fast-backward"}></i>
            </span>
          </a>
        </li>
        <li>
          <a
            title="Previous Page"
            // href={() => false}
            onClick={() => {
              props.pageChange(currentPage === 1 ? 1 : currentPage - 1);
            }}
          >
            <span>
              <i className={"fa fa-step-backward"}></i>
            </span>
          </a>
        </li>
        {pageItems}
        <li>
          <a
            title="Next Page"
            // href={() => false}
            onClick={() => {
              props.pageChange(
                currentPage === totalPages ? totalPages : currentPage + 1
              );
            }}
          >
            <span>
              <i className={"fa fa-step-forward"}></i>
            </span>
          </a>
        </li>
        <li>
          <a
            title="Last Page"
            // href={() => false}
            onClick={() => {
              props.pageChange(totalPages);
            }}
          >
            <i className={"fa fa-fast-forward"}></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
