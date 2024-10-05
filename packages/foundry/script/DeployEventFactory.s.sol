//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/EventFactory.sol";
import "./DeployHelpers.s.sol";

contract DeployEventFactory is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        EventFactory eventFactory = new EventFactory();
        console.logString(
            string.concat(
                "FundFactory deployed at: ",
                vm.toString(address(eventFactory))
            )
        );
    }
}
