import React from 'react'

// const ConfirmDelete = () => {
//     return (
//         <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] p-4 bg-white rounded-lg  '>

//             <h2 className='text-xl font-semibold mb-4 ' >Are you sure you want to delete this todo?</h2>
//             <div className='flex items-center justify-end gap-4 ' >
//                 <button className='px-4 py-2 text-[#E6E6E6] font-medium bg-blue-400 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer' >Cancel</button>
//                 <button className='px-4 py-2 text-[#E6E6E6] font-medium bg-red-500 rounded-lg transition-all ease-in shadow-white  hover:bg-white hover:text-black hover:shadow-[0_0_10px]  cursor-pointer' >Delete</button>
//             </div>
//         </div>
//     )
// }

const ConfirmDelete = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-[90%] max-w-sm p-4 bg-white rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                    Are you sure you want to delete this todo?
                </h2>

                <div className="flex items-center justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete
