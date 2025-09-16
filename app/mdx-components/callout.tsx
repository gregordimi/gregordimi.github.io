"use client";
//create a react tabs component with tailwindcss


export const Callout = ({ color = "border-blue-500 bg-blue-100", children }) => {
    
    
    return (
        <div className="w-full">
            <div className={`border-l-4 ${color} p-4`}>{children}</div>
        </div>
    );
    };  



