// foundry/src/ProofVerifier.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IVerifier.sol";

contract ProofVerifier {
    IVerifier public verifier;

    event ProofVerified(bool success);

    /**
     * @notice Verifies a Zero-Knowledge Proof by delegating to the Verifier contract.
     * @param _proof The proof data in bytes.
     * @param _publicInputs The public inputs associated with the proof.
     * @return success Boolean indicating if the proof is valid.
     */
    function verifyProof(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external returns (bool success) {
        bool result = verifier.verify(_proof, _publicInputs);
        emit ProofVerified(result);
        return result;
    }
}
