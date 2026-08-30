import NewBugForm from "../BugContainer/NewBugForm";

const ReportBugContainer = () => {

  const onBugAddition = (newBug) => {
    //Generate date to display
    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + mm + dd;

    //Fill in missing fields to allow render
    newBug['dateReported'] = today;
    newBug['assignees'] = [];
    newBug['active'] = true;

  }

  return (
    <div className='ml-72 pt-24 pb-16 pr-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-gray-950 min-h-screen'>

    <div className='max-w-7xl mx-auto'>

    <div className='mb-10 animate-slide-down'>
      <h1 className="text-5xl font-bold bg-gradient-orange bg-clip-text text-transparent">Report Issue</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">Create a new issue and track it</p>
      <div className='h-1 w-16 bg-gradient-orange rounded-full mt-4'></div>
    </div>

    <div className="flex flex-col justify-center items-center pt-8 pb-12 bg-white shadow-xl dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 px-8 md:px-12 py-12">

      <NewBugForm onBugAddition={onBugAddition} />

      </div>

   
  

    </div>

      
    </div>
  );
};

export default ReportBugContainer;
