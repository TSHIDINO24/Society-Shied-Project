import React, {useState} from 'react';

const ManagePayments = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

   // Dummy data for members and payments
  const membersData = [
    { name: 'John Doe', dueDate: '2023-10-15', status: 'Pending' },
    { name: 'Jane Smith', dueDate: '2023-09-12', status: 'Paid' },
    { name: 'Mike Johnson', dueDate: '2023-08-20', status: 'Pending' },
    { name: 'Emily Davis', dueDate: '2023-11-22', status: 'Paid' },
    { name: 'Laura Martinez', dueDate: '2023-10-05', status: 'Pending' },
    { name: 'Sarah Brown', dueDate: '2023-07-18', status: 'Paid' },
    { name: 'Daniel Wilson', dueDate: '2023-06-09', status: 'Pending' },
    { name: 'Sophia Lopez', dueDate: '2023-10-13', status: 'Pending' },
    { name: 'David Garcia', dueDate: '2023-08-11', status: 'Paid' },
    { name: 'Megan Clark', dueDate: '2023-09-25', status: 'Pending' },
    { name: 'Chris Adams', dueDate: '2023-11-10', status: 'Pending' },
    // Add more members for testing
  ];

  // Month options for dropdown
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter the members based on the search term
  const filteredMembers = membersData.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


   // Pagination: Get the current set of members to display
   const indexOfLastMember = currentPage * itemsPerPage;
   const indexOfFirstMember = indexOfLastMember - itemsPerPage;
   const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

   const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return (
        <div className="manage-payments-container">
        <h2>Manage Payments</h2>
  
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search members"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
  
        {/* Payment Table */}
        <div className="payments-table">
          <table>
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Month</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMembers.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>
                    <select>
                      {monthOptions.map((month, idx) => (
                        <option key={idx} value={month}>{month}</option>
                      ))}
                    </select>
                  </td>
                  <td>{member.dueDate}</td>
                  <td>{member.status}</td>
                  <td>
                    {member.status === 'Pending' ? (
                      <button className="pay-button">Pay</button>
                    ) : (
                      <button className="view-button">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Pagination Controls */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              className={currentPage === pageIndex + 1 ? 'active-page' : ''}
            >
              {pageIndex + 1}
            </button>
          ))}
        </div>
      </div>
    );
}

export default ManagePayments;
