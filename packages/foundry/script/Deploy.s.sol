//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import {DeployFundFactory} from "./DeployFundFactory.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployFundFactory deployFundFactory = new DeployFundFactory();
        deployFundFactory.run();

        // deploy more contracts here
        // DeployMyContract deployMyContract = new DeployMyContract();
        // deployMyContract.run();
    }
}
