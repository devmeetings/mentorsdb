import angular from 'angular';

import LinkedinComponent from './linkedin.component';
import LinkedinGeneralComponent from './general/linkedin-general.component';
import LinkedinEmailsComponent from './emails/linkedin-emails.component';
import LinkedinSkillsComponent from './skills/linkedin-skills.component';
import LinkedinJobsComponent from './jobs/linkedin-jobs.component';
import LinkedinDescriptionComponent from './description/linkedin-description.component';
import LinkedinLanguagesComponent from './languages/linkedin-languages.component';
import LinkedinEducationComponent from './education/linkedin-education.component';
import LinkedinGithubsComponent from './githubs/linkedin-githubs.component';

const linkedinModule = angular.module('app.linkedin', [])
.component('linkedinComponent', LinkedinComponent)
.component('linkedinGeneral', LinkedinGeneralComponent)
.component('linkedinEmails', LinkedinEmailsComponent)
.component('linkedinSkills', LinkedinSkillsComponent)
.component('linkedinJobs', LinkedinJobsComponent)
.component('linkedinDescription', LinkedinDescriptionComponent)
.component('linkedinLanguages', LinkedinLanguagesComponent)
.component('linkedinEducation', LinkedinEducationComponent)
.component('linkedinGithubs', LinkedinGithubsComponent);

export default linkedinModule;
