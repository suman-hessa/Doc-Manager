import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.error('Here is your toast.');

const ReactHotToast = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
};

export default ReactHotToast;