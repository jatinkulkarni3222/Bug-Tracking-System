import AssigneeElements from "../AsigneeElements";
import { useState, useEffect } from "react";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BsCheck, BsX } from 'react-icons/bs'

const BugRows = ({
  bugsToRender,
  isEditing,
  checked,
  handleOnChange,
  handleToggleActive,
  removeBug,
  handleChangePriority,
  onAddAssignee,
  onRemoveAssignee,
  allUsers,
  addUserFieldValue,
}) => {
  const userOptions = (bug) => {
    const usersToRender = allUsers.filter((user) => {
      for (const assignee of bug.assignees) {
        if (user.id == assignee.id) {
          return false;
        }
      }
      return true;
    });
    return usersToRender.map((user, index) => {
      return (
        <option key={index} value={user.id}>
          {user.name}
        </option>
      );
    });
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return <span className="badge-high">⚡ High</span>;
      case 'medium':
        return <span className="badge-medium">⚙️ Medium</span>;
      case 'low':
        return <span className="badge-low">✓ Low</span>;
      default:
        return <span className="badge-low">{priority}</span>;
    }
  };

  return bugsToRender.map((bug, index) => {
    let status = "Open";
    if (bug.active) {
      status = "Open";
    } else {
      status = "Closed";
    }
    return (
      <tr className="table-row" key={index}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            {isEditing == true ? (
              <input
                id={`custom-checkbox-${index}`}
                className="mr-2 cursor-pointer"
                name={bug.name}
                value={bug.name}
                type="checkbox"
                checked={checked[index]}
                onChange={() => handleOnChange(index)}
              />
            ) : (
              isEditing == false
            )}
            <div className="ml-2">
              <AssigneeElements
                bug={bug}
                onRemoveAssignee={onRemoveAssignee}
                bugIndex={index}
              />
              <select
                value={addUserFieldValue}
                id={index}
                onChange={onAddAssignee} 
                className="filter-dropdown text-sm mt-2 w-full"
              >
                <option value="" hidden disabled>
                  + add assignee
                </option>
                {userOptions(bug)}
              </select>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-200 max-w-xs truncate" title={bug.description}>
            {bug.description}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {getPriorityBadge(bug.priority)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button 
            value={index} 
            onClick={handleToggleActive} 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
              bug.active
                ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200'
            }`}
          >
            {bug.active ? (
              <>
                <BsCheck size={16} />
                Open
              </>
            ) : (
              <>
                <BsX size={16} />
                Closed
              </>
            )}
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900 dark:text-gray-200">
            <b className="font-semibold">{bug.reporter.name}</b>
            <br/>
            <span className="text-xs text-gray-500 dark:text-gray-400">{bug.reporter.role}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg">
            {bug.dateReported}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <button 
            value={index} 
            onClick={() => removeBug(bug.id)}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200 group"
            title="Delete issue"
          >
            <RiDeleteBin6Line
              size={18}
              className='text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors'
            />
          </button>
        </td>
      </tr>
    );
  });
};

export default BugRows;
