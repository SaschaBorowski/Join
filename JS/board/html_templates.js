function userStoryHtmlTemplate() {
    return `
    <div class="userStoryOutsideContainer flying-element">
        <div class="userStoryContainer">
            <div class="userStoryContainerInside">
                <div class="userStoryHeadlineAndCloseButtonContainer">
                    <div class="taskType">
                        User Story
                    </div>
                    <div onclick="closeUserStory()" class="userStoryCloseButtonContainer">
                        <img src="./img/userStory/close.png" alt="Close">
                    </div>
                </div>
                <div>
                    <h1 class="userStoryHeadline">
                        Kochwelt Page & Recipe Recommender
                    </h1>
                </div>
                <div class="taskDescription">
                    Build start page with recipe recommendation.
                </div>
                <div class="dueDateDateContainer">
                    <div class="dueDate">
                        Due date:
                    </div>
                    <div class="userStoryDateContainer">
                        18/06/2024
                    </div>
                </div>
                <div class="priorityContainer">
                    <div class="priority">
                        Priority:
                    </div>
                    <div class="priorityImageContainer">Medium <img src="./img/userStory/prio_medium.png"
                            alt="Medium Priority"></div>
                </div>
                <div class="assignedToContainer">
                    Assigned To:
                </div>
                <div class="userStoryContactContainer">
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">em</div>
                        <div class="userStoryContactFullName">Emmanuel Mauer</div>
                    </div>
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">mb</div>
                        <div class="userStoryContactFullName">Marcel Bauer</div>
                    </div>
                    <div class="userStoryContact">
                        <div class="userStoryContactLogo">am</div>
                        <div class="userStoryContactFullName">Anton Mayer</div>
                    </div>
                </div>
                <div class="userStorySubtaskContainer">
                    Subtasks
                </div>

                <div class="subtaskCheckboxHoverEffect">
                    <label class="container">
                        <input type="checkbox" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                    <div class="userStorySubtaskTitelContainer">
                        <p>Implement Recipe Recommendation</p>
                    </div>
                </div>

                <div class="subtaskCheckboxHoverEffect">
                    <label class="container">
                        <input type="checkbox" checked="checked">
                        <span class="checkmark"></span>
                    </label>
                    <div class="userStorySubtaskTitelContainer">
                        <p>Start page layout</p>
                    </div>
                </div>
                <div class="userStoryDeleteAndEditContainer">
                    <div class="userStoryDeleteContainer userStoryBackgroundImageDelete">

                        <div class="userStoryDeleteTextContainer">Delete</div>
                    </div>
                    <div class="userStoryCutLine"></div>
                    <div class="userStoryEditContainer userStoryBackgroundImageEdit">
                        <div class="userStoryEditTextContainer">Edit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}