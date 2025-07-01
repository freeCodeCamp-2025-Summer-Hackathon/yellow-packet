## Overview
This document describes the git workflow that should be used when pushing code to [project name]. This will applies to any developer whether they works on their personal computer or Github Codespaces.

- **Repository Hosting**: All code is stored on [GitHub](https://github.com/freeCodeCamp-2025-Summer-Hackathon/yellow-packet).

- **Branching Strategy**: We follow the _feature-branch_ model. For which:
  - `main` — stable production-ready branch. **Will reject any direct push request to the main branch**
  - Any developer that adding code to the project will be doing it through a feature branch, which will be describe in details below

## Workflows
### Making a new branch
Developer will be assigned an issue to work on, when working on the new issue, developer should create a new branch from `main`. The new feature branch should be name after the issue they work on. For example, if you are working on improving the login page, the feature branch should be named `login-page-improve`. There are no general rules when it come to naming a branch as long as we understand what the branch will be doing.
You can create a branch by
- Going to your termnal and type (Note: For this to work, you need to be on the main branch, if you on another feature branch, the history will be from that branch)
```
git checkout -b feature-branch-name
```
- You can follow this step below to create a branch on GitHub

![Git workflow 1](./images/gitworkflow1.png)
![Git workflow 2](./images/gitworkflow2.png)

### Push your commit
After finished your task, you should push your commit to your branch and create a merge request. **Please do not push directly to main, any attemp will be rejected**
You can create a merge request by going to Pull Requests > New Pull Request > Select your feature branch and merge it to base branch which is main. 

![Git workflow 3](./images/gitworkflow3.png)
![Git workflow 4](./images/gitworkflow4.png)

After making a Pull Request, please make sure these that:
- Your code has at least one other person to review the code and approve
- Your code is rebase on top the latest main branch
- If you have multiple commit, your code should squash them into a single commit. If you are not sure what squash, merge and rebase mean, please check with other people.

The benefit of this is that it keep our commit linearly and we can always revert a change when some bug was instroduced in a commit. Note that this requires careful since if you change code that was original in the main branch, rebase will introduce a merge conflict. Please communicate with team member carefully if you work on the same branch. Remeber, it is okay to have a merge conflict, we just have to solve it sooner instead of letting it growing and rotting the codebase.

### Code review
As a developer, when work in a team environment, you should practice code review diligiently. Letting bad code be commited to the repo will affect other people who will continue your work. In my opinion, writing code is easy, writing maintainable code that can be understand by other people is hard, which is why we might need some help from other people. Also, reviewing code help you have an understanding of the codebase even if you don't actively working on that feature.

A question you should ask in code review is:
- Why do we need this?
- Is the code correctly implement what is listed in the requirement? In the issue?
- Is the pass criteria acceptable?
- What impact will this bring?
- Is the code easy to understand, and can easily be maintainable if someone pick up the code in the future?

You can also follow this [document](https://google.github.io/eng-practices/review/reviewer/looking-for.html) for reference.

### Git tips and trick - Please put here if you have thing you can improve
- You can run the below command in git in your repo to help git run a cron job that is going to do maintenance for you 
```
git maintenance start
```
- When you rebase, you probally going to run into **"error: failed to push some refs"**. This can be easily fixed by running git push --force. However, --force is not recommend this since it might overwrite whatever your teammate is working on if you do not pull the commit from the branch. Instead run,
```
git push --force-with-lease
```
This make sure that you can over write commit if and only if you are the last one that match the ref. This is safer and ensure that you don't over write other people progress.
## Reference
- [Git workflow](https://github.com/asmeurer/git-workflow)
- [So you think you know Git - FOSDEM 2024](https://www.youtube.com/watch?v=aolI_Rz0ZqY)
- [What should you look in review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
