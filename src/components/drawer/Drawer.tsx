"use client";
import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import classNames from "classnames";
type DrawerProps = {
    open: Boolean;
    onClose: () => void;
    children?: ReactNode;
};

const Drawer = ({ open, onClose, children }: DrawerProps) => {
    return (
        <div
            role="drawer"
            className={classNames(
                "fixed right-0 top-0 h-screen overflow-y-auto bg-white w-full sm:w-1/2 lg:w-1/3 z-[300] translate-x-full ease-in-out duration-500 transition-transform",
                { "!translate-x-0": open }
            )}
            tabIndex={-1}
        >
            <button
                data-testid="close-button"
                className="fixed p-2 text-3xl text-gray-700 bg-blue-200 cursor-pointer top-4 right-6"
                onClick={onClose}
            >
                <IoCloseOutline />
            </button>
            {children}
        </div>
    );
};

export default Drawer;
