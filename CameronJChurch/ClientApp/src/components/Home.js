import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h5>TODO</h5>
                <ul>
                    <li>API Route Constants</li>
                    <li>Update homepage</li>
                    <li>Fix mobile formatting</li>
                    <li>Azure monitoring</li>
                    <li>Finances DD menu</li>
                    <li>Roles</li>
                    <li>Demo</li>
                    <li>Arch diagrams</li>
                    <li>n-tier</li>
                    <li>Fix resume download</li>                    
                </ul>
                <hr />
                <div id="contact">
                    <section className="center">
                        <a href="http://linkedin.com/in/cameronjchurch" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="mailto:cameron.j.church@gmail.com" rel="noopener noreferrer">Email</a>
                    </section>
                </div>
                <div>
                    <h3>Summary</h3>
                    <div>
                        <section>
                            <div className="center">Highly analytical problem solver with object-oriented design and implementation experience.</div>
                            <ul>
                                <li><strong>Distributed system design: </strong>over ten years experience interacting, analyzing and developing distributed systems for line of business applications.</li>
                                <li><strong>Cutting edge development methodologies: </strong>continuously honing skill set to keep pace with updates to development tools and emerging technologies. </li>
                                <li><strong>Great attention to detail: </strong>applied when tackling problems across various technicalities. </li>
                            </ul>
                        </section>
                    </div>
                    <h3>Skills</h3>
                    <div>
                        <section>
                            C#, .NET, MVC, React, EFCore, WCF, SQL, ASP.NET, DACPAC, Visual Studio, TFS, MS SQL Server, SSMS, IIS, TCP/IP, REST, HTML, JavaScript, jQuery, Knockout, AJAX, JSON, CSS, C, C++, Load Runner, Java, Eclipse, Google Web Toolkit, Scrum, Distributed Systems and more
                        </section>
                    </div>
                    <h3>Experience</h3>
                    <div>
                        <section>
                            <strong>Software Development Manager</strong>
                            <p>
                                <a href="http://www.bkfs.com/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Black Knight Financial Services</a> (BKFS) April 2015 – Present | Jacksonville, FL
                                Development lead ensuring code and design integrity, product stability, and deliverability of enhancements.
                            </p>
                            <ul>
                                <li>Participation in product scope and direction for client enhancements of budding commercial product.</li>
                                <li>Conceptual design of potential enterprise system enhancement for greater tracking and audit purposes.</li>
                                <li>Application of design patterns for addition of new client enhancements to facilitate decoupling of common code paths and requirement differences across multiple clients.</li>
                            </ul>
                            <strong>Applications Programmer III</strong>
                            <p>
                                <a href="http://www.bkfs.com/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Black Knight Financial Services</a> (BKFS) April 2015 – Present | Jacksonville, FL
                                Development lead ensuring code and design integrity, product stability, and deliverability of enhancements.
                            </p>
                            <ul>
                                <li>Participation in product scope and direction for client enhancements of budding commercial product.</li>
                                <li>Conceptual design of potential enterprise system enhancement for greater tracking and audit purposes.</li>
                                <li>Application of design patterns for addition of new client enhancements to facilitate decoupling of common code paths and requirement differences across multiple clients.</li>
                            </ul>
                            <strong>Applications Programmer II</strong>
                            <p>
                                <a href="http://www.bkfs.com/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Black Knight Financial Services</a> (formerly LPS) April 2013 – April 2015 | Jacksonville, FL
                                Implementation of new product features, timely defect remediation, and peer review of code.
                            </p>
                            <ul>
                                <li>Design and implementation of snapshot feature for externally enriched system data.</li>
                                <li>Implementation of service logging for incoming API calls from external systems.</li>
                                <li>Delivery of relying party enhancement to mature enterprise level commercial product.</li>
                                <li>Middle tier API work for consumption by various enterprise components.</li>
                                <li>Performance enhancements of heavily utilized code paths.</li>
                                <li>Code conversion to increase maintainability and product stability.</li>
                                <li>Defect remediation, troubleshooting and support across multiple environments.</li>
                            </ul>
                            <strong>Applications Development Analyst II</strong>
                            <p>
                                <a href="http://www.lpsvcs.com/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Lender Processing Services, Inc.</a> (LPS) March 2012 – April 2013 | Jacksonville, FL
                                Responsible for organization, management, and timely delivery of project commitments. Performance analysis of distributed computer systems. Implementation of automation tools to increase productivity.
                            </p>
                            <ul>
                                <li>Performance lead in proof of concept testing and analysis of several enterprise solutions.
                                    <ul>
                                        <li>Single Sign On</li>
                                        <li>Workflow Manager</li>
                                        <li>Enterprise Cloud Storage Appliance</li>
                                        <li>Enterprise Content Management</li>
                                    </ul>
                                </li>
                                <li>Direct identification of performance capabilities of enterprise components, also including discovery of performance concerns and assistance in remediation.</li>
                                <li>Organization and coordination of multiple concurrent performance engagements.</li>
                                <li>Design and implementation of an upgraded suite of custom tools to integrate with the latest version of industry standard performance testing software also including feature requests, platform migration and performance enhancements.</li>
                                <li>Provide insight and guidance to peers when needed.</li>
                            </ul>
                            <strong>Applications Development Analyst</strong>
                            <p>
                                <a href="http://www.lpsvcs.com/Pages/default.aspx" target="_blank" rel="noopener noreferrer">Lender Processing Services, Inc.</a> (LPS) November 2009 – March 2012 | Jacksonville, FL
                                Performance analysis of distributed computer systems. Implementation of automation tools to increase productivity.
                            </p>
                            <ul>
                                <li>Performance lead in proof of concept testing and analysis for an enterprise cloud storage solution.</li>
                                <li>Key contributor in multiple performance testing iterations across several line of business applications.</li>
                                <li>Design and implementation of several applications that integrate with performance testing tools to increase productivity.</li>
                                <li>Application of finite state machine concept to improve the coverage and accuracy of an extensive test scenario.</li>
                            </ul>
                        </section>
                    </div>
                    <h3>Education</h3>
                    <div>
                        <section>
                            <div><strong>University of Florida, </strong>Gainesville, FL</div>
                            <div className="float-left">Bachelor of Science, Computer Science Engineering</div><div className="float-right">Dean's List, College of Engineering 2009</div>
                            <div className="cear-fix">Minor in Communications Studies</div>
                        </section>
                    </div>
                </div>
                <div id="resumePrint" className="center"><p><a href="~/Documents/CameronJChurchResume.pdf">Download my resume</a></p></div>
            </div>
        );
    }
}
