// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Event.sol";

contract EventFactory {
    address[] public events;

    event EventCreated(address eventAddress, address organizer);

    function createEvent(
        string memory name,
        string memory date,
        string memory location,
        string memory description
    ) public {
        Event newEvent = new Event(
            name,
            date,
            location,
            description,
            msg.sender
        );
        events.push(address(newEvent));
        emit EventCreated(address(newEvent), msg.sender);
    }

    function getAllEvents() public view returns (address[] memory) {
        return events;
    }
}
