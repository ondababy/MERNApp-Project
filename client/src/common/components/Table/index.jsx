import PropTypes from 'prop-types';
function Table({ data, columns }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`${column.key}-${index}`}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={`${row.id}-${index}`}>
              {columns.map((column, index) => (
                <td key={`${row.id}-${column.key}-${index}`}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Table;

