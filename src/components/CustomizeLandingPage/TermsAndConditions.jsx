import React from "react";
import GCSLogo from "@/Assets/GCS-logo.png";
import TimerLogo from "@/Assets/timer.png";
import DailyLog from "@/Assets/MAINTENANCE_Image.png";
import Routine from "@/Assets/sop-image.png";

const BodySectionHTML = () => {
  const sectionStyle = {
    padding: "30px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "10px",
    backgroundColor: "white",
  };
  const commonMargin = {
    marginTop: 30,
  };
  const subtitleStyle = {
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: "#ff6600",
    color: "black",
    fontSize: "50px",
  };
  return (
    <div>
      <section style={sectionStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "end",
          }}
        >
          <img width={180} height={180} src={GCSLogo} alt="GCS Logo" />
          <h1 style={{ fontSize: "60px" }}>
            Limited lifetime craftsmanship <br />
            warranty
          </h1>
        </div>
        <div>
          <div style={commonMargin}>
            <i>
              This warranty reflects our history of superior craftsmanship,
              customized design, company integrity, and, most importantly,
              dedication to our customers. This warranty is our promise to you
              that we stand behind our products and services.
            </i>
          </div>
          <div style={commonMargin}>
            <p>
              GCS Glass & Mirror warrants our products against defects in
              materials and workmanship under normal use for as long as it is
              owned by the original purchasing business or consumer. This
              warranty is non-transferable, unless otherwise specified.
            </p>
          </div>
          <div style={commonMargin}>
            <p>
              If a defect occurs and a valid claim is received, GCS Glass &
              Mirror, at its sole discretion, will either repair or replace the
              defective product free of charge. If a claim is deemed valid, the
              decision whether to repair or replace is determined by GCS Glass &
              Mirror. Proof of purchase must be provided along with all warranty
              claims.
            </p>
          </div>
        </div>
        <div style={commonMargin}>
          <h4>Exclusions & Limitations</h4>
          <div style={commonMargin}>
            <ul style={{ padding: 0 }}>
              <ol>
                <li>
                  This warranty only applies to products, installations, or
                  services rendered after January 1, 2016.
                </li>
                <li>
                  The warranty only applies to products, installations, or
                  services purchased through GCS Glass & Mirror.
                </li>
                <li>
                  GCS does not warranty glass or hardware breakage, surface
                  scratches or scuffs once the product is installed or carried
                  out of the building, unless authorized by GCS, at its sole
                  discretion.
                </li>
                <li>
                  On rare occasions, tile may break and/or crack when drilling
                  holes. There is no warranty against tile breakage. If tile
                  breaks, install will stop and the customer will be notified
                  immediately. Breakage of tile, specifically when drilling,
                  reflects the quality of the tile installation, not the
                  workmanship or products of GCS. It is the customer's
                  responsibility to have tile replaced.
                </li>
                <li>
                  A frameless shower is made to deflect water, not retain it. If
                  a completely waterproof solution is desired, a frameless
                  shower is not suggested.
                </li>
                <li>
                  This warranty does not apply to defects or damages caused by
                  non-GCS glass or hardware, product abuse, product misuse,
                  improper care/cleaning, non-GCS repairs/installations,
                  movements/transfer of GCS glass or hardware from its original
                  installation location, or natural disaster.
                </li>
                <li>
                  Due to the nature of the products, glass handrails, glass
                  partitions, and commercial storefronts do not qualify for the
                  lifetime warranty.
                </li>
                <li>
                  Products may experience changes in appearance due to normal
                  wear and tear. Normal wear and tear is not a defect and is not
                  covered by this warranty. This includes, but is not limited
                  to, silicone adherence and discoloration, mirror de-
                  silvering, and hard water buildup. Information on proper care
                  and maintenance of showers can be found on Page 2.
                </li>
                <li>
                  Non-GCS branded hydrophobic nano-coating treatments come with
                  their own implied manufacturer's warranty. GCS Glass & Mirror
                  is not liable for any non-GCS nano-coating defects. All issues
                  must be taken to the manufacturer directly.
                </li>
                <li>
                  Per ASTM standards regarding blemishes in glass - glass needs
                  to be viewed from a 10-ft distance in natural, not direct,
                  light. If blemishes are still apparent, there should be cause
                  for remakes.
                </li>
                <li>
                  Glass panes over 108" in height or width are not warrantied
                  for bowing. Mirrors over 60x96" are not warrantied as larger
                  sizes are not recommended due to distortion.
                </li>
              </ol>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h3>Claims</h3>
          <p style={{ marginTop: "20px" }}>
            To submit a claim, contact your local GCS Glass location. Business
            hours vary by location.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h4>Phoenix, AZ</h4>
            <p>20634 N. 28th Street, Ste. 150</p>
            <p>Phoenix, Arizona 85050</p>
            <p>(602) 828-8276</p>
            <p>phoenix@gcs.glass</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4>Denver, CO</h4>
            <p>10500 E. 54th Ave, Unit H</p>
            <p>Denver, CO 80239</p>
            <p>(720) 601-1124</p>
            <p>denver@gcs.glass</p>
          </div>

          <div style={{ textAlign: "center" }}>
            <h4>Austin, TX</h4>
            <p>10509 Circle Drive, Unit 1440</p>
            <p>Austin, TX 78736</p>
            <p>(512) 480-9585</p>
            <p>austin@gcs.glass</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 60,
            width: "100%",
            marginTop: "40px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h4>Long Island, NY</h4>
            <p>1347 Lincoln Avenue, Unit 7</p>
            <p>Holbrook, NY 11741</p>
            <p>(516) 400-2514</p>
            <p>longisland@gcs.glass</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h4>Santa Cruz, CA</h4>
            <p>1970 17th Avenue</p>
            <p>Santa Cruz, CA 95062</p>
            <p>(831) 353-6486</p>
            <p>santacruz@gcs.glass</p>
          </div>
        </div>
        <div
          style={{
            fontSize: 18,
            textAlign: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <i>We appreciate the opportunity to earn your business!</i>
        </div>
      </section>

      <section style={{ ...sectionStyle, marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "end",
          }}
        >
          <img width={200} height={200} src={GCSLogo} alt="GCS Logo" />
          <h1 style={{ fontSize: "80px" }}>
            Glass & shower <br />
            maintenance
          </h1>
        </div>
        <div style={{ ...commonMargin, textAlign: "center", width: "90%" }}>
          <i>
            Please note, acid etched/frosted glass is extremely susceptible to
            fingerprints and spotting due to the oil on your hands and other
            environmental factors such as steam.
          </i>
        </div>

        <div
          style={{
            ...commonMargin,
            display: "flex",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div>
            <h1 style={{ ...subtitleStyle, marginLeft: -30 }}>
              WAIT BEFORE FIRST USE
            </h1>
            <p style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
              If silicone was used on your project, give your silicone at least
              24 hours to completely dry before first use.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            <img src={TimerLogo} alt="clock image" />
          </div>
        </div>

        <div
          style={{
            ...commonMargin,
            display: "flex",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            <img src={DailyLog} alt="clock image" />
          </div>
          <div>
            <h1 style={{ ...subtitleStyle, marginRight: -30 }}>
              DAILY MAINTENANCE
            </h1>
            <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
              <p>
                Crack your door after use or keep a squeegee handy to dry the
                inside of the shower to help with mold/mildew buildup.
              </p>
              <p style={{ marginTop: "5px" }}>
                If your bathroom has a vent fan, use it when showering to keep
                the area as dry as possible.
              </p>
              <p style={{ marginTop: "5px" }}>
                Wipe away moisture from your mirrors to maximize the life of the
                silver backing.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            ...commonMargin,
            display: "flex",
            gap: 10,
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <div>
            <h1 style={{ ...subtitleStyle, marginLeft: -30 }}>
              ROUTINE CLEANING
            </h1>
            <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
              <p>
                Never use aggressive cleaning materials (razorblades, steel
                wool, abrasives, etc.) to clean glass.
              </p>
              <p style={{ marginTop: "5px" }}>
                Always use non-ammonia glass cleaner and/or alcohol to clean
                glass.
              </p>
              <p style={{ marginTop: "5px" }}>
                Never use products containing hydrofluoric acid, fluorine,
                chlorine, or ammonia derivatives. They can damage the surface of
                the glass.
              </p>
              <p style={{ marginTop: "5px" }}>
                Always clean the full surface of the glass. Spot cleaning might
                create halos.
              </p>
              <p style={{ marginTop: "5px" }}>
                Never try to remove impurities with a dry or dirty cloth, as
                this may cause scratches or scuffs on the glass surface.
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            <img src={Routine} alt="clock image" />
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "end",
          }}
        >
          <img width={200} height={200} src={GCSLogo} alt="GCS Logo" />
          <h1 style={{ fontSize: "60px" }}>Terms & conditions</h1>
        </div>

        <h4 style={commonMargin}>Estimates</h4>
        <p style={commonMargin}>
          Quotes are for estimation purposes and are subject to change once
          project elements are finalized. Any alteration or deviation from the
          stated specifications involving extra costs will be executed upon
          written orders and will become an extra charge over and above the
          estimate. All agreements contingent upon strikes, accidents, or delays
          beyond our control. In certain areas, taxes may be included in
          pricing.
        </p>
        <p style={commonMargin}>
          Due to the current volatile nature of the manufacturing industry,
          estimates are only valid for 10 days from the date of proposal.
        </p>
        <p style={commonMargin}>
          All projects require a sign off, and a non-refundable 50% deposit is
          required to begin fabrication or ordering of materials for the job.
        </p>
        <p style={commonMargin}>
          There is a $75 fee for an in-person design consultation. If a deposit
          is paid at the time of consultation, the $75 is waived or credited.
        </p>

        <h4 style={commonMargin}>Payment</h4>
        <p style={commonMargin}>
          Full payment of the remaining balance plus all applicable taxes not
          already collected is required upon completion of the project. Such
          payment is to be made immediately to the installers who are on-site
          unless other terms are specified and agreed to by both GCS and
          customer. Make all checks payable to GCS Glass & Mirror. By approving
          the project and providing a deposit, you expressly agree to have the
          final balance charged to the credit card that was provided for the
          deposit, without any requirement of additional notice from GCS or
          approval by you as the customer. To avoid payment of the final balance
          being charged to the credit card provided for the deposit, customer
          must provide an alternative payment method at the completion of the
          project.
        </p>
        <h4 style={commonMargin}>Scope of Work</h4>
        <p style={commonMargin}>
          Work outside the scope of uninstalling and installing glass and metal
          products will not be completed by GCS team members. Please be sure
          that all fixtures, equipment, and furniture that could impede the
          glass installation space are removed prior to installation.
        </p>
        <p style={commonMargin}>
          If we are removing an existing shower, we have no way to predict what
          is behind the existing hardware. We do our very best to thoroughly
          clean the space before installing our new materials, and we fill holes
          with silicone if we are unable to cover them. Anything beyond these
          measures are out of our control. Without prior knowledge of existing
          below-surface material, it is the customer's responsibility to warn us
          of layout and depth restrictions.
        </p>
        <h4 style={commonMargin}>Orders</h4>
        <p style={commonMargin}>
          We are consistently working to improve our relationships with existing
          vendors or trying new ones if necessary to improve quality and lead
          times for our customers. Lead times vary depending on the vendor,
          product, and time of year.
        </p>
        <p style={commonMargin}>
          We cannot guarantee a perfect match when attempting to match existing
          hardware colors. While manufacturers have like- names for hardware, it
          does not mean they are truly the same color or finish. We are limited
          to our vendor's color selections. These colors often vary from common
          bathroom fixture brands.
        </p>
        <h4 style={commonMargin}>Recommendations</h4>
        <p style={commonMargin}>
          Mirrors over 60" in width or height are at greater risk of distortion
          in the glass. Due to this, we do not warranty any mirrors over 60 x
          96."
        </p>
        <p style={commonMargin}>
          For shower installations, please allow 24 hours for your silicone to
          dry completely before using your shower to avoid damaging the
          silicone. Single pieces of glass over 108" in height or width do not
          fall under our warranty for glass bowing.
        </p>
      </section>

      <section style={{ ...sectionStyle, marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "end",
          }}
        >
          <img width={200} height={200} src={GCSLogo} alt="GCS Logo" />
          <h1 style={{ fontSize: "60px" }}>
            Terms & conditions <br /> <i style={{ fontSize: "40px" }}>continued</i>
          </h1>
        </div>

        <h4 style={commonMargin}>Media Use and Ownership Addendum</h4>
        <p style={commonMargin}>
          This Media Use and Ownership Addendum ("Addendum") is incorporated
          into the Service Agreement ("Agreement") between GCS Glass ("Company")
          and the customer ("Customer").
        </p>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <ul>
            <li>
              Media Capture: Customer acknowledges and agrees that Company may
              take photographs, videos, or other forms of media ("Media") that
              showcase the work performed by Company on Customer's property.
              This may include before and after images, process images, or any
              other type of Media that reasonably demonstrates the services
              provided by the Company.
            </li>
            <li>
              Use of Media: Customer expressly grants Company the right to use,
              reproduce, distribute, and display any Media captured on
              Customer’s property for Company's legitimate business purposes,
              including but not limited to marketing, advertising, and social
              media content, without obtaining additional consent from the
              Customer.
            </li>
            <li>
              Rights to Media: Customer grants Company a universal,
              royalty-free, perpetual, irrevocable, non-exclusive right and
              license to use, modify, adapt, publish, translate, distribute,
              perform, and display such Media, and to incorporate it in other
              works in any form, media, or technology now known or later
              developed.
            </li>
            <li>
              Non-interference: Customer agrees not to interfere with or inhibit
              the Company's capture and use of Media as provided herein.
            </li>
            <li>
              No Compensation: Customer agrees and acknowledges that the consent
              to use the Media as described above is given without expectation
              of additional compensation or further notification.
            </li>
          </ul>
        </div>
        <p>
          By engaging the Company to move forward with its services, Customer
          acknowledges and agrees to the terms of this Media Use and Ownership
          Addendum.
        </p>
        <h4 style={commonMargin}>Warranty</h4>
        <p style={commonMargin}>
          All shower installations include the standard lifetime limited GCS
          Warranty. The GCS Armor comes with a limited 10 year warranty. GCS
          Crystalline Glass comes with a limited lifetime warranty. Warranties
          are non-transferable unless otherwise specified. Harsh cleaners are
          not recommended on shower glass to improve the life of the coating and
          silicone. Silicone will naturally breakdown overtime, but harsh
          cleaners will accelerate this. For this reason, silicone is not
          warrantied. *See additional detailed warranty.*
        </p>

        <p style={commonMargin}>
          Frameless glass is made to deflect water and steam, not retain it.
          Small gaps can be necessary for proper function and to allow for the
          settling and shifting of a home. If a completely waterproof solution
          is desired, a frameless unit is not suggested.
        </p>
        <p style={commonMargin}>
          Per ASTM standards regarding blemishes in glass - glass needs to be
          viewed from a 10-ft distance in natural, not direct, light. If
          blemishes are still apparent, there should be cause for remakes.
        </p>
        <p style={commonMargin}>
          On rare occasions, tile may break and/or crack when drilling holes.
          There is no warranty against tile breakage. If tile breaks, install
          will stop and the customer will be notified immediately. Breakage of
          tile, specifically when drilling, reflects the quality of the tile
          installation, not the workmanship or products of GCS. It is the
          customer's responsibility to have the tile replaced.
        </p>
        <p style={commonMargin}>
          If you have any questions or concerns regarding these terms, please
          contact your local GCS office.
        </p>
        <div style={commonMargin}>
          <strong>
            By approving your estimate, whether by signature, payment of
            deposit, or other written approval, you acknowledge receipt and
            understanding of these terms and conditions, and further, you
            acknowledge your express agreement to be bound by each.
          </strong>
        </div>
      </section>
    </div>
  );
};

export default BodySectionHTML;