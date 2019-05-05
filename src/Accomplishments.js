import React, { Component } from 'react';
import './Accomplishments.css'
function Accomplishments() {
  return (
    <div className="accomplishments-page-wrapper">
      <div className = "quick-info">
        <ul>
          <li><a href="MuhammedImranResumeMarch2019.pdf" target="_blank">See pdf version</a></li>
          <br/>
          <ul className = "quick-info-inner"> Connect with me: 
            <li><a href= "https://www.linkedin.com/in/muhammed-imran-64233b170/" target="_blank">LinkedIn</a></li> 
            <li>Email: <span>imranmuhammed2000@gmail.com</span></li>
            <li>Second Email: miimran2@illinois.edu</li>
          </ul>
        </ul>
      </div>
      <p id="resume-note">Note: Most of the following information can be found in the pdf version found in the bar to the right. Provided here simply for viewing pleasure!</p>
      <div className = "resume-info">
        <div id = "basic-info">
          <h2>Education</h2>
          <h4>University of Illinois @ Urbana-Champaign | Fall 2018 - Present</h4>
          <p>Major: Computer Science</p>
          <p>GPA: 4.0/4.0</p>
          <h4>Completed Coursework: </h4>
          <p>CS 126: Software Design Studio | CS 173: Discrete Structures | CS 225: Data Structures | CS 296: Data Visualization</p>
          <p>CS 233: Computer Architecture | MATH 285: Intro to Differential Equations | MATH 415: Applied Linear Algebra</p>
        </div>
        <div id = "activities-info">
          <h2>Activities/Leadership</h2>
          <h4>Engineering Open House Exhibition Participant | Spring 2019</h4>
            <ul>
              <li> 
                Developed a cheap lie detector with remarkable accuracy over the course of 2 months
              </li>
              <li>
                Collaborated with a medium-sized team to ensure product effectiveness and software correctness
              </li>
              <li>
                Presented lie detector to numerous visiting schools during annual EOH exhibition
              </li>
            </ul>
          <h4>Member in WebMonkeys, ACM Group | Fall 2018 - Spring 2019</h4>
            <ul>
              <li>
                Learned about modern web-development features and practices, which is how I am able to build this site!
              </li>
            </ul>
          <h4>Member in P.U.R.E. (Promoting Undergraduate Research in Engineering) | Fall 2018</h4>
            <ul>
              <li>
                Worked with PhD candidate, Wajih Ul-Hussan, whose thesis is in Security
              </li>
              <li>
                Aided his research in tracking how malicious software affected and corrupted files on Windows systems
              </li>
              <li>
                Presented efforts at P.U.R.E. symposium.
              </li>
            </ul>
          <h4>President of JETS Team (Junior Engineering Techical Society) | Fall 2017 - Spring 2018</h4>
            <ul>
              <li>
                Participated in the WYSE and TEAMS competitions.
              </li>
              <li>
                As president, organized and led meetings for other students participating in academically competitive exams
              </li>
            </ul>
        </div>
        <div id = "projects-info">
          <h2>Projects</h2>
          <ul>
            <li>
              Developed a lie detector in collaboration with a team as part of EOH. My contributions focused on visualizing data collected from the Arduino boards. <a href="https://github.com/walbers/TOI-EOH" target="_blank">See GitHub</a>
            </li>
            <li>
              Developed WinLog, a Windows data provenance visualization tool as part of P.U.R.E.
              Can be used to track file-file interactions. <a href="poster_wlog.pdf" target = "_blank">See Poster.</a> <a href="https://github.com/Wajihulhassan/winprov" target="_blank">See GitHub.</a>
            </li>
            <li>
              As part of CS 296, developed a visualization to reflect changing international student demographics at UIUC. <a href="international-visualization/visIndex.html" target="_blank">See visualization. </a>
            </li>
          </ul>
        </div>
        <div id = "achievements-skills-info">
          <div id = "achievements-info">
            <h2>Achievements</h2>
            <ul>
              <li>
                Graduated High School Summa Cum Laude
              </li>
              <li>
                Received Illinois Science Teachers Association Outstanding Science Student Award
              </li>
              <li>
                Finished 3rd in Regional in WYSE Competition
              </li>
            </ul>
          </div>
          <div id = "skills-info">
            <h2>Skills</h2>
            <p>Computer Languages</p>
            <ul>
              <li>
                JAVA, C++, Python, CSS, HTML
              </li>
            </ul>
            <p>Foreign Languages</p>
            <ul>
              <li>
                Spanish, Urdu
              </li>
            </ul>
          </div>
          <div id="spacer"></div>
        </div>
      </div>
    </div>
  );
}

export default Accomplishments;