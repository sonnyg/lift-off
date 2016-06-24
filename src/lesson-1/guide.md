# Lesson 1 Guide

This lesson provides a very basic introduction to HTML.

## Getting Started

Before you can start coding, you need some way to write code! Since code is just text, any text editor will do. However, as you progress, your needs will become more sophisticated and you will want more advanced features from your editor of choice.

These more advanced editors are typically referred to as an **IDE**. This stands for *Integrated Development Environment*. They are called this because they often include other tools (integrated), useful for coding (development), into a single application (environment).
Phew!

### IDE

So, let's download and install our first IDE. There are hundreds of IDE's available but for the purposes of this exercise, we will be using Atom. Let's start by downloading and installing Atom.

Atom: https://atom.io/

After Atom has been installed, go ahead and launch the editor.

Atom offers dozens of additional features, called packages, that can be downloaded and installed for free. In addition to these packages, the look of the editor can be changed by downloading themes. One package, in particular, is really helpful for doing web development (which we're doing), so let's download and install our first package *atom-html-preview*.

From the Atom main menu:

1. Select *Preferences*
2. Select the *Install* setting
3. Type in *html preview* in the text box
4. Click the blue *Install* button for the atom-html-preview package
5. If you're feeling adventurous, try installing a theme or two!

For best results, you should restart Atom once you're done.

*... waiting for Atom to restart*

OK, Atom has restarted and now we're ready to start coding, right? Almost!

Code changes. A lot. You might learn how to do something in a better way, or maybe you feel like experimenting and trying something new. Or you may be part of a team and everyone is writing code, changing code, and just generally *evolving* the code. This is completely natural and is one of the reasons I view code as a *living thing*. It's always growing and changing!

This sounds exciting, but what happens when the code gets *sick* or some bug (glitch) rears it's ugly head and breaks everything! How would you know what changed, or who made the change? Wouldn't it be nice if we could go back in time to when the code wasn't sick? Back to a time when it all worked? Well, we can!

We don't need a machine to do it either, just some software. In particular, we need some software that allows us to go back in time and see all the changes that were made to a file. Better still, it would be really helpful to see not only the changes to a file but **all** the files that were changed with it. This is called *versioning* and the software that helps you with this is called **VCS** or *Version Control System*. Simply put, this is software that provides a *system* to *control* changes (*versions*) of a file.

### VCS

As there is with everything, there are a number of good quality VCS's out there. For this exercise, however, we will be using a VCS called *git*. Now, let's go *git* it.

git: https://git-scm.com/downloads

Install git and, wait, where is it?

Unlike some software you may be used to, git does not come with a fancy user interface. There are user interfaces available but you don't need fancy tools, right? Right!

Git is what is called a **CLI** or Command Line Interface application. This simply means that you can use (*interface*) with you computer and give it *commands*, one *line* at a time.

Um, OK. So how do I do that?

All computers come with an application that allows you to type commands, one line at a time, to tell it what to do. Kind of like a bossy older sibling. Except, in this case, *you* are the bossy sibling. Let's be bossy.

Open the CLI application:

- On a "Windows" machine, type "cmd" (without the quotes) into the text box on the start menu, and hit enter.
- On a "Mac" machine, type "term" (without the quotes) into the finder (or spotlight search), and hit enter.

If everything went according to plan, you have a little black (usually) box on your screen. The plan here is to create some folders to store our files. Type these commands (followed by enter):

- `mkdir dojo`
- `cd dojo`
- `mkdir lift-off`
- `cd lift-off`

All this did was make a folder called "dojo", then you created a folder *inside* it, called "lift-off". The "lift-off" folder is where you will store your code.

What you need to do know, is to tell git about this folder and, most importantly, set it up for versioning. To do this, type this command (followed by enter):

- `git init .`

This tells git to *initialize* the current folder. In your case, this is the "lift-off" folder.
