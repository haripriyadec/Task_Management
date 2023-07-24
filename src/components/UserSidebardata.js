import React from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as BsIcons from "react-icons/bs"
import * as CgIcons from "react-icons/cg"
import { IoPencil} from "react-icons/io5";
import { IoCheckboxSharp } from "react-icons/io5";
import { MdPolicy,MdRateReview ,MdHelpCenter} from "react-icons/md";
import { IoDesktop } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";


export const UserSidebardata=[
    {
        title:'Home',
        path:'/home',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Personal Details',
        path:'/details',
        icon:<BsIcons.BsPersonCircle/>,
        cName:'nav-text'
    }
    ,
    {
        title:'Task',
        path:'/work',
        icon:<IoPencil/>,
        cName:'nav-text'
    }
    ,{
        title:'Tasklist',
        path:'/tasklist',
        icon:<MdPolicy/>,
        cName:'nav-text'
    }
    ,
    ,{
        title:'DashBoard ',
        path:'/dashboard',
        icon:<BsBank2/>,
        cName:'nav-text'
    }
    ,
    {
        title: 'Reports',
        path:'/report',
        icon: <IoDesktop/>,
        cName: 'nav-text'
    }
    
    
]