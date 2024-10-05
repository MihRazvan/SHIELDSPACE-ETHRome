// foundry/scripts/DeployProofVerifierWithInterface.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../contracts/ProofVerifier.sol";

contract DeployProofVerifierWithInterface is Script {
    function run() external {
        vm.startBroadcast();
        ProofVerifier proofVerifier = new ProofVerifier();
        vm.stopBroadcast();
        console.log("ProofVerifier deployed at:", address(proofVerifier));
    }
}
