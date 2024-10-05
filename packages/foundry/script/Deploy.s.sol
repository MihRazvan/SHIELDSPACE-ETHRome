//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import {DeployEventFactory} from "./DeployEventFactory.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployEventFactory deployEventFactory = new DeployEventFactory();
        deployEventFactory.run();

        // deploy more contracts here
    }
}
