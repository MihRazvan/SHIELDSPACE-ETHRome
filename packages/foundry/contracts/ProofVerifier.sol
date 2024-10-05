// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./contract.sol";

contract ProofVerifier {
    BaseUltraVerifier verifier;

    function verifyProof(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool success) {
        // Call the verify function from the IVerifier contract
        bool result = verifier.verify(_proof, _publicInputs);

        return result;
    }
}
