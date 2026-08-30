import { useEffect, useState } from "react";
import { postBug } from "../../../services/BugsService";
import { MdNoteAdd } from 'react-icons/md';
import { FiAlertCircle, FiUser } from 'react-icons/fi';

const NewBugForm = ({ onBugAddition }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [reporter, setReporter] = useState("");
  
    useEffect(() => {
      getAllUsers();
    }, []);
  
    const getAllUsers = () => {
      fetch("http://localhost:8080/users")
        .then((result) => result.json())
        .then((data) => setAllUsers(data));
    };
  
    const userOptions = allUsers.map((user, index) => {
      return (
        <option value={index} key={index}>
          {user.name}
        </option>
      );
    });
  
    const onChange = (event) => {
      if (event.target.id === "description") {
        setDescription(event.target.value);
      } else if (event.target.id === "priority") {
        setPriority(event.target.value);
      } else if (event.target.id === "reporter") {
        setReporter(event.target.value);
      }
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      if (priority && reporter) {
        postBug(
          {
            description: description,
            priority: priority,
          },
          allUsers[reporter]
        );
        const newBug = {
          description: description,
          priority: priority,
          reporter: allUsers[reporter],
        };
        onBugAddition(newBug);
        setDescription("");
        setPriority("");
        setReporter("");
      }
    };
  
    return (
      <form onSubmit={onSubmit} className="w-full max-w-2xl">
        <div className="space-y-8">
          {/* Description Field */}
          <div className="relative">
            <label
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide"
              htmlFor="description"
            >
              <MdNoteAdd className='text-orange-500' size={18} />
              Description
            </label>
            <textarea
              onChange={onChange}
              id="description"
              value={description}
              required
              rows={4}
              placeholder="Describe the bug in detail..."
              className="form-input w-full resize-none"
            />
          </div>

          {/* Priority and Reporter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Field */}
            <div className="relative">
              <label
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide"
                htmlFor="priority"
              >
                <FiAlertCircle className='text-orange-500' size={18} />
                Severity
              </label>
              <select
                className="form-select w-full"
                onChange={onChange}
                id="priority"
                value={priority}
                required
              >
                <option value="">Select severity level...</option>
                <option value="high">🔴 High - Critical</option>
                <option value="medium">🟡 Medium - Important</option>
                <option value="low">🟢 Low - Minor</option>
              </select>
            </div>

            {/* Reporter Field */}
            <div className="relative">
              <label
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide"
                htmlFor="reporter"
              >
                <FiUser className='text-orange-500' size={18} />
                Reported By
              </label>
              <select
                className="form-select w-full"
                onChange={onChange}
                id="reporter"
                value={reporter}
                required
              >
                <option value="">Select a user...</option>
                {userOptions}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start pt-4">
            <button 
              type="submit"
              className="button-primary flex items-center gap-2"
            >
              <span>✓</span>
              Submit Issue
            </button>
          </div>
        </div>
      </form>
    );
  };
  
  export default NewBugForm;
