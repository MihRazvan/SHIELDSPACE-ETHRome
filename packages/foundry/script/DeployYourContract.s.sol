//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/FundFactory.sol";
import "./DeployHelpers.s.sol";

contract DeployFundFactory is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        FundFactory fundFactory = new FundFactory(deployer);
        console.logString(
            string.concat(
                "FundFactory deployed at: ",
                vm.toString(address(fundFactory))
            )
        );
    }
}
