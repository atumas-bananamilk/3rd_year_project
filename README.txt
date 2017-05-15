Creator: Aivaras Tumas
The University of Manchester
School of Computer Science
3rd Year Project

--------------------------------------------------------------------
ABOUT
--------------------------------------------------------------------
3D POV Semi-Hologram

How it works:
1.  A user creates his 3D shape designs on the web application
2.  After the design has been finished, click RUN
3.  The design is uploaded onto the system which draws 3D holograms


--------------------------------------------------------------------
MORE INFO
--------------------------------------------------------------------
Report - Report.pdf
Screencast - https://goo.gl/x2LcSh


--------------------------------------------------------------------
RUNNING TESTS:
--------------------------------------------------------------------
Tests (unit, automation) are only done on the browser-side 
(Javascript) as we assume that data at Arduino will be received with 
no alterations (no middle-man), so there is no need for testing data 
after receiving it, but only before transmitting.

1.  Unit tests:
        Open "TESTS/unit_tests.html" on your browser
2.  Automation tests:
        Create a new Java project, import Selenium lib into your 
        project, make sure you have the right browser (Chrome 
        or Firefox) installed, run the file.