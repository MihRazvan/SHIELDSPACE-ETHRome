// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Event {
    string public name;
    string public date;
    string public location;
    string public description;
    address public organizer;

    // Store encrypted participant data
    bytes[] private encryptedParticipants;

    event ParticipantRegistered(address participant);
    event EncryptedDataAdded(bytes encryptedData);

    modifier onlyOrganizer() {
        require(
            msg.sender == organizer,
            "Only organizer can perform this action"
        );
        _;
    }

    constructor(
        string memory _name,
        string memory _date,
        string memory _location,
        string memory _description,
        address _organizer
    ) {
        name = _name;
        date = _date;
        location = _location;
        description = _description;
        organizer = _organizer;
    }

    // Participants register by submitting their encrypted data
    function register(bytes memory encryptedData) public {
        encryptedParticipants.push(encryptedData);
        emit ParticipantRegistered(msg.sender);
        emit EncryptedDataAdded(encryptedData);
    }

    // Only organizer can retrieve the list of encrypted participants
    function getEncryptedParticipants()
        public
        view
        onlyOrganizer
        returns (bytes[] memory)
    {
        return encryptedParticipants;
    }

    // Function to get event details (if more processing is needed)
    function getEventDetails()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address
        )
    {
        return (name, date, location, description, organizer);
    }
}
