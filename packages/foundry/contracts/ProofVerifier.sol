// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IVerifier.sol";

contract ProofVerifier {
    IVerifier public verifier; // Define an instance of the IVerifier interface

    event ProofVerified(bool success);

    /**
     * @notice Constructor to set the verifier contract address.
     * @param _verifierAddress The address of the deployed verifier contract.
     */
    constructor(address _verifierAddress) {
        verifier = IVerifier(_verifierAddress);
    }

    /**
     * @notice Verifies a Zero-Knowledge Proof by delegating to the IVerifier contract.
     * @param _proof The proof data in bytes.
     * @param _publicInputs The public inputs associated with the proof.
     * @return success Boolean indicating if the proof is valid.
     */
    function verifyProof(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool success) {
        // Call the verify function from the IVerifier contract
        bool result = verifier.verify(_proof, _publicInputs);

        // Emit the ProofVerified event
        emit ProofVerified(result);

        return result;
    }
}
