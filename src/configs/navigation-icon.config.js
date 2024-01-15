import React from 'react'
import {
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineColorSwatch,
    HiOutlineUserGroup,
    HiOutlineUserCircle,
    HiOutlineBell
} from 'react-icons/hi'
import { HiOutlineInboxStack, HiOutlineBuildingOffice2, HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";

const navigationIcon = {
    products: <HiOutlineInboxStack />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    buildings: <HiOutlineBuildingOffice2 />,
    catalog: <HiOutlineColorSwatch />,
    agents: <HiOutlineUserCircle/>,
    incomeBox: <HiOutlineArchiveBoxArrowDown/>,
    users: <HiOutlineUserGroup/>,
    notification: <HiOutlineBell/>,
}

export default navigationIcon
