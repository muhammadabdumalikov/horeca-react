import React from 'react'
import {
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineColorSwatch,
    HiOutlineUserGroup,
    HiOutlineUserCircle,
    HiOutlineBell,
    HiOutlineCalculator,
    HiOutlineClipboardList
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
    notification: <HiOutlineBell/>,
    calculator: <HiOutlineCalculator/>,
    clipboardList: <HiOutlineClipboardList/>,
    users: <HiOutlineUserGroup/>
}

export default navigationIcon
